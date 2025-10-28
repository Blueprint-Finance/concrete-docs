const USER_ID = process.env.ALGOLIA_CRAWLER_USER_ID || '';
const API_KEY = process.env.ALGOLIA_CRAWLER_API_KEY || '';
const CRAWLER_ID = process.env.ALGOLIA_CRAWLER_ID || '';
const CRAWLER_URL = 'https://crawler.algolia.com/api';

if (!USER_ID || !API_KEY || !CRAWLER_ID) {
  console.error('Error: ALGOLIA_CRAWLER_USER_ID, ALGOLIA_CRAWLER_API_KEY, and ALGOLIA_CRAWLER_ID environment variables are required');
  process.exit(1);
}

const basicAuth = Buffer.from(`${USER_ID}:${API_KEY}`).toString('base64');

async function triggerCrawl() {
  try {
    console.log('Step 1: Fetching CSRF token...');
    const getResponse = await fetch(CRAWLER_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
      },
    });

    if (!getResponse.ok) {
      throw new Error(`GET request failed with status ${getResponse.status}`);
    }

    // Get Set-Cookie headers
    const setCookieHeader = getResponse.headers.get('set-cookie');

    if (!setCookieHeader) {
      throw new Error('No Set-Cookie header found in response');
    }

    console.log('Set-Cookie received:', setCookieHeader);

    // Extract _csrf cookie value
    const csrfCookieMatch = setCookieHeader.match(/_csrf=([^;,]+)/);
    if (!csrfCookieMatch) {
      throw new Error('_csrf cookie not found in Set-Cookie header');
    }
    const csrfCookie = csrfCookieMatch[1].trim();
    console.log('_csrf cookie extracted:', csrfCookie);

    // Extract XSRF-TOKEN value (for X-CSRF-Token header)
    const xsrfMatch = setCookieHeader.match(/XSRF-TOKEN=([^;,]+)/);
    if (!xsrfMatch) {
      throw new Error('XSRF-TOKEN not found in Set-Cookie header');
    }
    const csrfToken = xsrfMatch[1].trim();
    console.log('XSRF-TOKEN extracted:', csrfToken);

    console.log('\nStep 2: Triggering crawl with CSRF token...');
    const postResponse = await fetch(`${CRAWLER_URL}/1/crawlers/${CRAWLER_ID}/reindex`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'X-CSRF-Token': csrfToken,
        'Cookie': `_csrf=${csrfCookie}; XSRF-TOKEN=${csrfToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const responseText = await postResponse.text();
    console.log('Crawl trigger response status:', postResponse.status);
    console.log('Response body:', responseText);

    if (postResponse.ok) {
      console.log('\n✅ Algolia crawl triggered successfully!');
    } else {
      console.warn('\n⚠️  Unexpected response status:', postResponse.status);
      throw new Error(`POST request failed with status ${postResponse.status}`);
    }
  } catch (error) {
    console.error('Error triggering crawl:', error.message);
    process.exit(1);
  }
}

triggerCrawl();

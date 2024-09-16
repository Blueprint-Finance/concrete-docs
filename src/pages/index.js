import React from 'react';
import { Redirect } from '@docusaurus/router';

function Home() {
  return <Redirect to="docs/Overview/welcome" />;
}

export default Home;

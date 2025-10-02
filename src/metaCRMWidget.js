import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import siteConfig from "@generated/docusaurus.config";

const METACRM_VERSION = "3.10.1";
const METACRM_SCRIPT_URL = `https://widget.metacrm.inc/static/js/widget-${METACRM_VERSION.replace(
  /\./g,
  "-",
)}.js`;
const METACRM_SCRIPT_INTEGRITY =
  "sha384-zZSg2BlTanuqbyXMt2J8LdSxoj0uZUr2rIfH9ahUFzlL3OB+BOPXMepc/EnDD97q";
const METACRM_SCRIPT_ID = "metacrm-widget-script";
const GLOBAL_STYLE_ID = "metacrm-overrides";
const IFRAME_STYLE_ID = "concrete-metacrm-style";

const iframeCss = `
#simple-popover > :last-child:not(:only-child) {
  display: none !important;
}
`;

if (ExecutionEnvironment.canUseDOM) {
  const apiKey = siteConfig?.customFields?.metacrmApiKey;

  if (!apiKey) {
    console.warn("MetaCRM: METACRM_API_KEY not provided. Skipping widget.");
  } else {
    ensureGlobalOverrides();
    window.attachMetaCRMStyles ||= attachIframeOverrides;
    bootstrapWidget(apiKey);
  }
}

function ensureGlobalOverrides() {
  if (document.getElementById(GLOBAL_STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = GLOBAL_STYLE_ID;
  style.textContent = `
@media (max-width: 660px) {
  #meta-crm-widget:not(.mobile-open) {
    left: -9px !important;
  }
}
`;

  document.head.appendChild(style);
}

function loadWidgetScript() {
  if (document.getElementById(METACRM_SCRIPT_ID)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const targetScript = document.getElementsByTagName("script")[0];
    if (!targetScript) {
      reject(new Error("MetaCRM: no script tag available for insertion"));
      return;
    }

    const script = document.createElement("script");
    script.id = METACRM_SCRIPT_ID;
    script.src = METACRM_SCRIPT_URL;
    script.crossOrigin = "anonymous";
    script.integrity = METACRM_SCRIPT_INTEGRITY;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`MetaCRM: failed loading ${METACRM_SCRIPT_URL}`));

    targetScript.parentNode.insertBefore(script, targetScript);
  });
}

function attachIframeOverrides() {
  const iframe = document.getElementById("meta-crm-widget");
  if (!iframe) {
    return;
  }

  const inject = () => {
    try {
      const doc = iframe.contentDocument;
      if (!doc || !doc.head || doc.getElementById(IFRAME_STYLE_ID)) {
        return;
      }

      const style = doc.createElement("style");
      style.id = IFRAME_STYLE_ID;
      style.textContent = iframeCss;
      doc.head.appendChild(style);
    } catch (error) {
      console.warn("MetaCRM: unable to inject iframe styles", error);
    }
  };

  if (iframe.contentDocument?.readyState === "complete") {
    inject();
  }

  if (!iframe.dataset.metacrmStyleListenerAttached) {
    iframe.addEventListener("load", inject);
    iframe.dataset.metacrmStyleListenerAttached = "true";
  }
}

function bootstrapWidget(apiKey) {
  loadWidgetScript()
    .then(() => {
      if (typeof window.MetaCRMWidget?.init !== "function") {
        throw new Error("MetaCRM: MetaCRMWidget.init unavailable after load");
      }

      window.MetaCRMWidget.init({
        apiKey,
        autoOpenNewNotification: true,
        manualConnect: true,
      });

      window.attachMetaCRMStyles();
      setTimeout(window.attachMetaCRMStyles, 1000);
    })
    .catch((error) => {
      console.error("MetaCRM: unable to bootstrap widget", error);
    });
}

export function onRouteDidUpdate() {
  window.attachMetaCRMStyles?.();
}


import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const METACRM_SCRIPT_URL = "https://app.concrete.xyz/api/metacrm/widget.js";
const METACRM_SCRIPT_ID = "metacrm-widget-script";

if (ExecutionEnvironment.canUseDOM) {
  if (!document.getElementById(METACRM_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = METACRM_SCRIPT_ID;
    script.src = METACRM_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
  }
}

export function onRouteDidUpdate() {
  window.attachMetaCRMStyles?.();
}

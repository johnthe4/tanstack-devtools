// const script = document.createElement("script");
// script.src = chrome.runtime.getURL("inject.js");
// (document.head || document.documentElement).appendChild(script);

// script.onload = function () {
//   script.remove();
// };

// window.addEventListener("message", (event) => {
//   if (event.source !== window || event.data.type !== "TANSTACK_QUERY_STATE") return;
//   chrome.runtime.sendMessage({ type: "QUERY_STATE_UPDATE", payload: event.data.payload });
// });
(() => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("inject.js");
  (document.head || document.documentElement).appendChild(script);

  script.onload = () => {
    script.remove(); // Clean up after injection
  };

  window.addEventListener("message", (event: MessageEvent) => {
    if (event.source !== window || event.data.type !== "TANSTACK_QUERY_STATE") return;

    chrome.runtime.sendMessage({
      type: "QUERY_STATE_UPDATE",
      payload: event.data.payload,
    });
  });
})();
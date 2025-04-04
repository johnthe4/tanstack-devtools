chrome.devtools.panels.create(
    "TanStack",
    "", // Panel icon (optional)
    "index.html", // The React UI
    function (panel) {
      console.log("DevTools panel created");
    }
  );
  
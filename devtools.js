chrome.devtools.panels.create(
    "My Panel",
    "icon.png", // Panel icon (optional)
    "index.html", // The React UI
    function (panel) {
      console.log("DevTools panel created");
    }
  );
  
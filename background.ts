chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === "QUERY_STATE_UPDATE") {
      chrome.runtime.sendMessage(message);
    }
  });
  
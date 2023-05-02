
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "read-clipboard-text") {
    readFromClipboard().then((text) => {
      chrome.runtime.sendMessage({ action: "clipboard-text", text: text });
    });
  }
});

function readFromClipboard() {
  return new Promise((resolve) => {
    navigator.clipboard.readText().then((text) => {
      resolve(text);
    });
  });
}




//backgroundan gelen
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "show-response") {
    showResponse(request.response);
  }
});


function showResponse(response) {
  if (!response) return;

  const responseElement = document.createElement("div");
  responseElement.textContent = response;
  responseElement.style.position = "fixed";
  responseElement.style.top = "10px";
  responseElement.style.right = "10px";
  responseElement.style.backgroundColor = "white";
  responseElement.style.border = "1px solid white";
  responseElement.style.padding = "10px";
  responseElement.style.borderRadius = "5px";
  responseElement.style.zIndex = "10000";
  document.body.appendChild(responseElement);

  setTimeout(() => {
    document.body.removeChild(responseElement);
  }, 2000);
}



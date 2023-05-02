

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "read-clipboard-text" });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clipboard-text") {
    sendMessage(request.text);
  }
});



function sendMessage(text) {
  const API_KEY = "";

  // console.log(text);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      temperature: 0.5,
    }),
  };

  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
  .then((response) => {
  // console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data.choices[0].message.content);
  
    // Aktif sekmedeki content scripte mesaj gönder
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "show-response",
          response: data.choices[0].message.content,
      });
    }
  });
})

}


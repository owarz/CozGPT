// Örnek olarak API_KEY'nin saklanacağı değişken.
const API_KEY = "your_api_key_here";

// API anahtarını chrome.storage gönder
chrome.storage.sync.set({ "api_key": API_KEY }, function () {
  console.log("API anahtarı kaydedildi.");
});

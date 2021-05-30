let value, isEnabled;
chrome.storage.local.get(['url'], function(items){
  value = items.url;
});
chrome.storage.local.get(['enabled'], function(items){ //onload...
  isEnabled = items.enabled;
});

chrome.storage.onChanged.addListener(function (changes, namespace){
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if(key == "url"){
        value = newValue;
      }
      else if(key == "enabled"){
        isEnabled = newValue;
      }
    }
});

chrome.tabs.onCreated.addListener(function callback(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    let pendingUrl = tabs[0].pendingUrl;
    if(url == "" && pendingUrl == "chrome://newtab/" && isEnabled){
        if(!value.includes("http://") && !value.includes("https://") && value.includes(".") && !value.includes("file") && !value.includes("C:/") && !value.includes("D:/")){
          value = "http://" + value;
        }
        chrome.tabs.update(tabs[0].id, {url: value});
    }
  });
});

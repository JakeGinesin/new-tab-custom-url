
// onload functions
let value, isEnabled;
chrome.storage.local.get(['url'], function(items){
  value = items.url;
});
chrome.storage.local.get(['enabled'], function(items){
  isEnabled = items.enabled;
});

//updates the input value and isEnabled
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
  chrome.tabs.query({active: true, lastFocusedWindow: true}, async(tabs) => {
    let url = tabs[0].url;
    let pendingUrl = tabs[0].pendingUrl;

    //a URL will always have a "." in it.
    if(
       url == "" && //If a link is opened in chrome from another application, the script shouldn't fire
       pendingUrl == "chrome://newtab/" &&
       isEnabled &&
       value != '' && //it shouldn't fire if the input value is empty either
       !url.includes("file:///") && //script shouldn't fire if the browser is opening a local file
       !url.substring(0, 11).includes("C:/") &&
       !url.substring(0, 11).includes("D:/") &&
       !url.substring(0, 11).includes("E:/")
     ){
        //certain inputs should have "http://" appended in front if:
        // 1. the input is a URL
        // 2. the input does not already have "http://" or "https://" in front of it
        // 3. the input is not a file (PDFs, for example, open in browsers)
        if(
          !value.includes("http://") &&
          !value.includes("https://")
        ){
          value = "http://" + value; //assuming http. Most websites will have built in redirect already
        }
        await chrome.tabs.update(tabs[0].id, {url: value});
    }
  });
});

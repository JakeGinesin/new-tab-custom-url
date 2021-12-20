chrome.storage.local.get(['url'], function(items){
  let loc = window.location.href;
  let url = items.url;
  if(loc.includes(url)){
    document.getElementById("search").select();
  }
});

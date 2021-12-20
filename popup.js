// onload functions:

chrome.storage.local.get(['url'], function(items){ //onload...
  setPlaceHolder(items.url);
});

chrome.storage.local.get(['enabled'], function(items){ //onload...
  document.getElementById("enabled").checked = items.enabled;
});

// active functions:

document.getElementById("help").addEventListener('click', ()=>{
  alert("New-tab-custom-url changes the default url of a newly opened tab in chrome! \r\n \r\nThis project is open source. Find the code at: https://github.com/JakeGinesin/new-tab-custom-url");
});

document.getElementById("change").addEventListener('click', ()=>{
  updateUrl();
});


document.addEventListener("keydown", event => {
  if(event.keyCode === 13 && document.getElementById("url").value != ""){ //activtes on enter
    updateUrl();
  }
});

document.getElementById("enable-box").addEventListener('click', ()=>{
  document.getElementById("enabled").checked = !document.getElementById("enabled").checked;
  check();
});

document.getElementById("enabled").addEventListener('change', function(){
  check();
})

function check(){
  chrome.storage.local.set({"enabled": document.getElementById("enabled").checked}, function(){
    //random callback lol
  });
}

function setPlaceHolder(url){
  document.getElementById("url").setAttribute("placeholder", url);
}

function updateUrl(){
  let change = document.getElementById("url").value;
  chrome.storage.local.set({"url":change}, function(){
    setPlaceHolder(change);
  });

  document.getElementById("url").value='';
}

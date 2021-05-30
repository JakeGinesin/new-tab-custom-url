chrome.storage.local.get(['url'], function(items){ //onload...
  setPlaceHolder(items.url);
});

chrome.storage.local.get(['enabled'], function(items){ //onload...
  document.getElementById("enabled").checked = items.enabled;
});

document.getElementById("help").addEventListener('click', ()=>{
  alert("tabber changes the default url of a newly opened tab!");
});

document.getElementById("change").addEventListener('click', ()=>{
  updateUrl();
});

document.addEventListener("keydown", event => {
  if(event.keyCode === 13 && document.getElementById("url").value != ""){
    updateUrl();
  }
});

document.getElementById("enabled").addEventListener('change', function(){
  chrome.storage.local.set({"enabled": this.checked}, function(){
    //random callback lol
  });
})

function setPlaceHolder(url){
  document.getElementById("url").setAttribute("placeholder", url);
}

function updateUrl(){
  let change = document.getElementById("url").value;
  chrome.storage.local.set({"url":change}, function(){
    setPlaceHolder(change);
  });

  document.getElementById("url").value == "";
}

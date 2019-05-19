// for debugging purposes, this set the local storage when the
//  extension loads up. this will come from options later.
if (window.localStorage.getItem("pict") === null) {
  console.log("setting pict");
  window.localStorage.setItem("pict", "http://localhost:8000/3.jpg");
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({ file: "toggleNasaImage.js" }, function() {
    chrome.tabs.query(
      { active: true, currentWindow: true, currentWindow: true },
      function(tabs) {
        let tabId;
        if (tabs && tabs.length > 0) {
          tabId = tabs[0].id;
          console.log(`background.js:tabs passed in valid`);
        } else {
          // see bug fix comments below
          console.log(`background.js:tabs passed in not valid`);
          tabId = activeTabId;
        }
        url = window.localStorage.getItem("pict");
        console.log(`backupground.js:${url}`);
        chrome.tabs.sendMessage(tabId, { url: url }, function(response) {
          console.log(`background.js:message sent succesfully`);
        });
      }
    );
  });
});

// bug fix for dec tools problem below
// https://stackoverflow.com/questions/28786723/why-doesnt-chrome-tabs-query-return-the-tabs-url-when-called-using-requirejs
let activeTabId;

chrome.tabs.onActivated.addListener(function(activeInfo) {
  activeTabId = activeInfo.tabId;
});

function getActiveTab(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    var tab = tabs[0];

    if (tab) {
      callback(tab);
    } else {
      chrome.tabs.get(activeTabId, function(tab) {
        if (tab) {
          callback(tab);
        } else {
          console.log("No active tab identified.");
        }
      });
    }
  });
}
// bug fix for dec tools problem above
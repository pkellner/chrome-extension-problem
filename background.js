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

// chrome.browserAction.onClicked.addListener(() => {
//   chrome.tabs.executeScript({
//     file: "toggleNasaImage.js"
//   });
// });

// var urlxxx =
//   "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/p5020056.jpg";
//  var url =
//    "https://ddrt7tzfkdwdf.cloudfront.net/Images/silicon-valley-code-camp.png";

//var url = "https://ddrt7tzfkdwdf.cloudfront.net/Images/organize01.jpg";

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
//     response
//   ) {
//     console.log('abcd');
//   });
// });

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//   chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
// });

// chrome.tabs.executeScript(
//   { file: "/content_scripts/beastify.js" },
//   results => {
//     console.log(
//       `chrome.tabs.executeScript:nasaPageShowing:${nasaPageShowing}`
//     );
//     if (nasaPageShowing === false && firstTime === true) {
//       chrome.tabs.query({ active: true, currentWindow: true }, beastify);
//       nasaPageShowing = true;
//       firstTime = false;
//     } else if (nasaPageShowing === false && firstTime === false) {
//       chrome.tabs.query({ active: true, currentWindow: true }, beastify);
//       nasaPageShowing = true;
//     } else {
//       nasaPageShowing = false;
//       chrome.tabs.query({ active: true, currentWindow: true }, reset);
//     }
//   }
// );

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
//chrome.tabs.executeScript({ file: "/content_scripts/beastify.js" }, results => {
//chrome.tabs.insertCSS({ code: hidePage }, () => {
//let url = "https://apod.nasa.gov/apod/image/1904/LagoonPanSTARRS_ColesPugh1024.jpg";
// might need to make sure we have class beautify
//chrome.tabs.query({ active: true, currentWindow: true }, beastify);
//});
//});

/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
// const hidePage = `body > :not(.beastify-image) {
//                     display: none;
//                   }`;
//
// const showPage = `body > :not(.beastify-image) {
//                     display: inline;
//                   }`;
//
// /**
//  * Insert the page-hiding CSS into the active tab,
//  * then get the beast URL and
//  * send a "beastify" message to the content script in the active tab.
//  */
// function beastify(tabs) {
//   chrome.tabs.insertCSS({ code: hidePage }, () => {
//     let url = chrome.extension.getURL("stars.jpeg");
//     chrome.tabs.sendMessage(tabs[0].id, {
//       command: "beastify",
//       beastURL: url
//     });
//   });
// }
//
// function reset(tabs) {
//   chrome.tabs.insertCSS({ code: showPage }, () => {
//     chrome.tabs.sendMessage(tabs[0].id, {
//       command: "reset",
//       beastURL: ""
//     });
//   });
// }

// https://stackoverflow.com/questions/4976996/tabs-executescript-passing-parameters-and-using-libraries
//   https://stackoverflow.com/questions/17567624/pass-a-parameter-to-a-content-script-injected-using-chrome-tabs-executescript

// chrome.tabs.executeScript(tab.id, {file: 'content.js'}, function() {
//   chrome.tabs.sendMessage(tab.id, 'whatever value; String, object, whatever');
// });

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   // Handle message.
//   // In this example, message === 'whatever value; String, object, whatever'
// });

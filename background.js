let nasaPageShowing = false;
let firstTime = true;



/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

const showPage = `body > :not(.beastify-image) {
                    display: inline;
                  }`;

/**
 * Insert the page-hiding CSS into the active tab,
 * then get the beast URL and
 * send a "beastify" message to the content script in the active tab.
 */
function beastify(tabs) {
  chrome.tabs.insertCSS({ code: hidePage }, () => {
    let url = chrome.extension.getURL("stars.jpeg");
    chrome.tabs.sendMessage(tabs[0].id, {
      command: "beastify",
      beastURL: url
    });
  });
}


function reset(tabs) {
  chrome.tabs.insertCSS({ code: showPage }, () => {
    chrome.tabs.sendMessage(tabs[0].id, {
      command: "reset",
      beastURL: ""
    });
  });
}

chrome.browserAction.onClicked.addListener(() => {
  console.log("x");
  chrome.tabs.executeScript(
    { file: "/content_scripts/beastify.js" },
    results => {
      console.log(
        `chrome.tabs.executeScript:nasaPageShowing:${nasaPageShowing}`
      );
      if (nasaPageShowing === false && firstTime === true) {
        chrome.tabs.query({ active: true, currentWindow: true }, beastify);
        nasaPageShowing = true;
        firstTime = false;
      }
      else if (nasaPageShowing === false && firstTime === false) {
        chrome.tabs.query({ active: true, currentWindow: true }, beastify);
        nasaPageShowing = true;
      }
      else {
        nasaPageShowing = false;
        chrome.tabs.query({ active: true, currentWindow: true }, reset);
      }
    }
  );
});



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

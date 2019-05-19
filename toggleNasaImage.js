let firstTime = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.url) {
    console.log(`toggleNasaImage.js:${request.url}`);

    if (firstTime === true) {
      firstTime = false;
      var styles = `
        body.imagecover::before {
        content: "";
        background-image: url("${request.url}");
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        display: inline;
      }
      `;

      var styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }


    if ($("body").hasClass("imagecover")){
      $("body").removeClass("imagecover");
    } else {
      $("body").addClass("imagecover fade");
      //document.body.className = "imagecover fade";
      setTimeout(() => {
        //document.body.className = "imagecover";
        $("body").removeClass("fade");
      }, 100); // make 0
    }

    sendResponse({ xx: "xx" });
  }
  // if (request.greeting == "hello")
  //   sendResponse({farewell: "goodbye"});
});

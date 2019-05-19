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

// document.getElementsByTagName("body")[0].style.display = "inline";
// console.log("about to create image");
// n = document.createElement("img"); // create an image element
// n.src =
//   "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/p5020056.jpg"; // relative path to the image
// document.body.appendChild(n); // append the image to the body

//var bodyElementStyle = document.getElementsByTagName("BODY")[0].style;
//let firstTime = true;

// $('<link/>', {
//   rel: 'stylesheet',
//   type: 'text/css',
//   href: path
// }).appendTo('head');

// Your CSS as text
// var styles = `
//     .qwebirc-qui .ircwindow div {
//         font-family: Georgia,Cambria,"Times New Roman",Times,serif;
//         margin: 26px auto 0 auto;
//         max-width: 650px;
//     }
//     .qwebirc-qui .lines {
//         font-size: 18px;
//         line-height: 1.58;
//         letter-spacing: -.004em;
//     }
//
//     .qwebirc-qui .nicklist a {
//         margin: 6px;
//     }
// `;
//
// var styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);

//console.log("top of toggleNasaImage");
// console.log("TaggoleNasaImage.js:" + document.body.className);

//
// document.body.className += " " + "imagecoverOpacity10";
// ["20", "40", "60", "80", "100"].map((opacityPercent, index) => {
//   setTimeout(() => {
//     document.body.className += ` imagecoverOpacity${opacityPercent} `;
//   }, 100);
// });

//

//imagecoverOpacity50
// document.body.className += " " + "imagecoverOpacity10";
// setTimeout(() => {
//   document.body.className += " " + "imagecoverOpacity50";
//   setTimeout(() => {
//     document.body.className += " " + "imagecoverOpacity100";
//   },500)
// },500);

// if (document.body.className.indexOf("imagecover") >= 0) {
//   document.body.className = document.body.className.replace(" imagecover", "");
// } else {
//   document.body.className += " " + "imagecover";
// }

// BELOW WORKS!!!
// var opacityPercent = 0;
// var opacityPercentPrevious = 0;
// function MyFadeFunction() {
//   function replaceOpacityClassName(className, opacityPreviousVal, opacityVal) {
//     console.log(
//       `replaceOpacityClassName:${className}:${opacityPreviousVal}:${opacityVal}`
//     );
//     const opacityPrevious = `imagecoverOpacity${opacityPreviousVal}`;
//     const opacity = `imagecoverOpacity${opacityVal}`;
//     if (className.indexOf(opacityPrevious) >= 0) {
//       className = className.replace(opacityPrevious, "");
//     }
//     className += " " + opacity;
//     console.log(`replaceOpacityClassName returning:${className}`);
//     return className;
//   }
//   console.log(opacityPercent);
//   if (opacityPercent < 100) {
//     opacityPercentPrevious = opacityPercent;
//     opacityPercent += 10;
//     const x  = replaceOpacityClassName(
//       document.body.className,
//       opacityPercentPrevious,
//       opacityPercent
//     );
//     document.body.className = x;
//     setTimeout(function() {
//       MyFadeFunction();
//     }, 300);
//   }
// }
// MyFadeFunction();

// var styles = `
// body.imagecover::before {
//   content: "";
//   background-image: url("https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/p5020056.jpg");
//   background-size: contain;
//   background-repeat: no-repeat;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 9999;
//   display: inline;
// }
// `;

//const nothingUrl = chrome.extension.getURL("nothing.jpeg");
// var url =
//   "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/p5020056.jpg";
//
// var styles = `
//   body.imagecover::before {
//   content: "";
//   background-image: url("${url}");
//   background-size: contain;
//   background-repeat: no-repeat;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 9999;
//   display: inline;
// }
// `;
//
// var styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);
//
// document.body.className = "imagecover fade";
// setTimeout(() => {
//   document.body.className = "imagecover";
// }, 100); // make 0

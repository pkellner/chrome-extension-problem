// document.getElementsByTagName("body")[0].style.display = "inline";
// console.log("about to create image");
// n = document.createElement("img"); // create an image element
// n.src =
//   "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/p5020056.jpg"; // relative path to the image
// document.body.appendChild(n); // append the image to the body

//var bodyElementStyle = document.getElementsByTagName("BODY")[0].style;

console.log("top of toggleNasaImage");
console.log("TaggoleNasaImage.js:" + document.body.className);

if (document.body.className.indexOf("imagecover") >= 0) {
  document.body.className = document.body.className.replace(" imagecover", "");
} else {
  document.body.className += " " + "imagecover";
}

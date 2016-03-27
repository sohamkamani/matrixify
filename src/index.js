'use strict';
import createRenderer from './expand-dots';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const dimensions = {
  w: 100,
  h: 80
};
let img;
const onImageLoad = function () {

  var oc = document.createElement('canvas'),
    octx = oc.getContext('2d');
  oc.width = dimensions.w;
  oc.height = dimensions.h;
  octx.drawImage(img, 0, 0, oc.width, oc.height);

  const imageData = octx.getImageData(0, 0, oc.width, oc.height);
  const imgArray = Array.from(imageData.data);
  const renderer = createRenderer({
    arr: imgArray,
    ctx,
    width: canvas.width,
    height: canvas.height,
    dimensions
  });

  setInterval(() => renderer.render(), 1000 / 30);
};

// img.src = '/images/mountain.jpg';

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function (event) {
    img = new Image(dimensions.w, dimensions.h);
    img.onload = onImageLoad;
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

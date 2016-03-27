'use strict';
import createRenderer from './renderer';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = '21px monospace';
ctx.fillStyle = '#5EFF00';
ctx.fillText('Upload any image file ^^^', 10,30);

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

  const render = ()=>{
    renderer.render();
    window.requestAnimationFrame(render);
  };
  render();
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

'use strict';
import {chunk, mean} from 'lodash';
import drawMatrix from './expand-dots';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const dimensions = {
  w : 30,
  h : 20
};
const img = new Image(dimensions.w, dimensions.h);
img.onload = function () {

    // canvas.height = canvas.width * (img.height / img.width);
    //
    // /// step 1
    var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');
    //
    oc.width = dimensions.w;
    oc.height = dimensions.h;
    octx.drawImage(img, 0, 0, oc.width, oc.height);
    // octx.drawImage(oc, 0, 0, oc.width * scale, oc.height * scale);
    //
    const imageData = octx.getImageData(0,0,oc.width, oc.height);
    const imgArray = Array.from(imageData.data);
    const chunkedArray = chunk(imgArray, oc.width * 4).map(row => chunk(row, 4).map(([r,g,b]) => 0.2126*r + 0.7152*g + 0.0722*b));

    /// step 2
    console.log('log:',imageData);
    drawMatrix({
      arr : chunkedArray,
      ctx,
      width : canvas.width,
      height : canvas.height
    });

    // ctx.putImageData(imageData, 10, 10)
    // ctx.drawImage(img, 0,0);
    // ctx.drawImage(oc, 0, 0, oc.width * scale, oc.height * scale,
    // 0, 0, canvas.width, canvas.height);
};
img.src = '/images/async.png';

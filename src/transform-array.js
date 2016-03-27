'use strict';
import Color from 'color';

module.exports = arr => arr.map(row => row.map(value => {
  const intensity = Math.floor(value);
  const color = Color('#5EFF00').darken(intensity / 255).rgb();
  return {
    fillStyle: `rgb(${color.r},${color.g},${color.b})`
  };
}));

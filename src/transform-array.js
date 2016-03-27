'use strict';
import Color from 'color';

module.exports = arr => arr.map(row => row.map(value => {
  const intensity = Math.floor(value) / 255;
  const color = Color('#5EFF00').darken(intensity / 255).rgb();
  return {
    fillStyle: `rgba(0,0,0,${intensity})`
  };
}));

'use strict';
import {
  times,
  chunk
} from 'lodash';
import Color from 'color';
import pickRandom from './pick-random';
import transformArray from './transform-array';
import generateTextMatrix from './text-matrix-array';

module.exports = function ({
  arr,
  ctx,
  width,
  height,
  dimensions
}) {

  const chunkedArray = chunk(arr, dimensions.w * 4).map(row => chunk(row, 4).map(([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b));
  const transformedArray = transformArray(chunkedArray);
  const rows = transformedArray.length;
  const columns = transformedArray[0].length;

  const squareWidth = width / columns;
  const squareHeight = height / rows;

  ctx.font = '11px monospace';
  const textOptions = 'asdfghjk!@#$%^&*()'.split('');
  const {value : textMatrix, refresh : refreshText} = generateTextMatrix(rows, columns, squareHeight);
  let displacement = 0;

  return {
    render: () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      times(rows, nRow => {
        times(columns, nColumn => {
          const text = textMatrix[nRow][nColumn];
          ctx.fillStyle = transformedArray[nRow][nColumn].fillStyle;
          ctx.fillText(text, nColumn * squareWidth, nRow * squareHeight + displacement);
          // ctx.fillRect(nColumn * squareWidth, nRow * squareHeight, squareWidth, squareHeight);
        });
      });
      displacement += 1;
      displacement = refreshText(displacement);
    }
  }
};

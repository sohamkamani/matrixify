import {times} from 'lodash';

module.exports = ({arr, ctx, width, height}) => {
  const rows = arr.length;
  const columns = arr[0].length;

  const squareWidth = width / columns;
  const squareHeight = height / rows;

  times(rows, nRow => {
    times(columns, nColumn => {
      const color = Math.floor(arr[nRow][nColumn]);
      ctx.fillStyle = `rgb(${color},${color},${color})`;
      ctx.fillRect(nColumn * squareWidth, nRow * squareHeight, squareWidth, squareHeight);
    });
  });
};

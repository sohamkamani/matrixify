'use strict';
import pickRandom from './pick-random';
import {times} from 'lodash';

module.exports = (row, col, squareSize)=> {
  const textOptions = 'asdfghjk!@#$%^&*()'.split('');
  let textMatrix = times(row + 3).map(()=> times(col, ()=> pickRandom(textOptions)));

  return{
    value : textMatrix,
    refresh : displacement => {
      if(displacement <= squareSize){
        return displacement;
      }
      textMatrix.pop();
      textMatrix.unshift(times(col, ()=> pickRandom(textOptions)));
      return 0;
    }
  };
};

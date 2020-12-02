import React, { useState } from 'react';
import { ImageMap } from "@qiuz/react-image-map";

import './App.css';
import { AreaType } from "./AreaType";
import { BingoSquare } from './BingoSquare';

export interface MapArea {
  left: string;
  top: string;
  height: string;
  width: string;
}

const IMAGE = "./img/bingo1.jpeg";

const X_SQUARE_COUNT = 5;
const Y_SQUARE_COUNT = 5;

const X_OFFSET = 5;
const Y_OFFSET = 13;

const X_SPACING = 1;
const Y_SPACING = 1;

const X_SCALE = 0.85;
const Y_SCALE = 0.72;

export const Bingo = () => {
  const mapAreas: MapArea[] = []
  for (let i = 0; i < X_SQUARE_COUNT * Y_SQUARE_COUNT; i++) {
    const x_idx = i % X_SQUARE_COUNT;
    const y_idx = Math.floor(i / X_SQUARE_COUNT);

    const height = (100 / Y_SQUARE_COUNT) * Y_SCALE;
    const width = (100 / X_SQUARE_COUNT) * X_SCALE;

    const element = {
      left: `${(x_idx*width)+X_OFFSET+(x_idx*X_SPACING)}%`,
      top: `${(y_idx*height)+Y_OFFSET+(y_idx*Y_SPACING)}%`,
      height: `${height}%`,
      width: `${width}%`,
    };
    mapAreas.push(element);
  }

  const bingoSquareStates = [];
  for (const mapArea of mapAreas) {
    bingoSquareStates.push(false);
  }

  const [crossed, setCrossed] = useState(bingoSquareStates);

  const bingoSquares = [];
  for (let idx = 0; idx < mapAreas.length; idx++) {
    bingoSquares.push(<BingoSquare mapArea={mapAreas[idx]} crossed={crossed[idx]} />);
  }

  return (
    <div className="bingo-container">
      <ImageMap
        className="usage-map"
        src={IMAGE}
        map={mapAreas}
        onMapClick={
          (area: AreaType, index: number) => {
            console.log(area, index, crossed);
            const newCrossed = [...crossed]
            newCrossed[index] = !crossed[index];
            setCrossed(newCrossed);
          }
        }
      />
      {bingoSquares}
    </div>
  );
}

function App() {
  return (
    <div className="flex-container">
      <div className="flex-item bingo">
        <Bingo />
      </div>
    </div>
  );
}

export default App;

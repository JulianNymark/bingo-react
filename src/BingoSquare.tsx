import React from 'react';
import { MapArea } from './App';

interface Props {
    mapArea: MapArea;
    crossed: boolean;
}

export const BingoSquare = (props: Props) => {

    // offset with mapArea
    return <>{props.crossed && <img
        style={props.mapArea}
        className="bingo-square"
        src="./img/cross.png"
    />}</>;
}
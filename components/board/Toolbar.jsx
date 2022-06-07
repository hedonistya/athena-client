import React from 'react';
import {Button, FormControlLabel, Slider, Switch} from "@mui/material";
import {observer} from "mobx-react-lite";

//components
import {BoxToolbar} from "../../styles/toolbar";
import {paintState} from "../../store";

const Toolbar = observer(() => {
  // stroke width listener
  const setLineWidth = (event) => {
    paintState.setStrokeWidth(event.target.value);
  };

  // clear canvas
  const getClear = () => {
    const socket = new WebSocket('ws://localhost:5000/');
    socket.onopen = () => {
      socket.send(JSON.stringify({
        method: 'clear',
        id: window.location.pathname.replace('/', '')
      }));
    }
  };

  return (
    <>
      <BoxToolbar>
        <p>Ширина обводки</p>
        <Slider defaultValue={paintState.strokeWidth} min={1} max={30} aria-label="Default" valueLabelDisplay="auto"
                sx={{width: 150, marginLeft: 2}} onChange={e => setLineWidth(e)}/>
        <Button sx={{marginLeft: 1}} onClick={getClear}>Очистить</Button>
        <FormControlLabel
          value="start"
          control={<Switch color="primary"/>}
          label="Заливка"
          labelPlacement="start"
          checked={paintState.figureColor}
          onChange={() => paintState.setFigureColor(!paintState.figureColor)}
        />
      </BoxToolbar>
    </>
  );
});

export default Toolbar;
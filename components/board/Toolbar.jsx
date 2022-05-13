import React from 'react';
import {BoxToolbar} from "../../styles/toolbar";
import {Button, Divider, IconButton, Slider} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import paintState from "../../store/paintState";
import boardState from "../../store/boardState";

const Toolbar = () => {
  return (
    <>
      <BoxToolbar>
        <IconButton onClick={() => boardState.undo()}>
          <UndoIcon/>
        </IconButton>
        <IconButton onClick={() => boardState.redo()}>
          <RedoIcon/>
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem sx={{marginRight: 1}}/>
        <p >Ширина обводки</p>
        <Slider defaultValue={1} min={1} max={30} aria-label="Default" valueLabelDisplay="auto" sx={{width: 150, marginLeft: 2}} onChange={e => paintState.setLineWidth(e.target.value)}/>
        <Button sx={{marginLeft: 1}}>Очистить</Button>
      </BoxToolbar>
    </>
  );
};

export default Toolbar;
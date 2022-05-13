import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PaletteIcon from '@mui/icons-material/Palette';
import {Box, IconButton, Paper} from "@mui/material";
import {useState} from "react";
import paintState from "../../store/paintState";
import boardState from "../../store/boardState";
import {Brush, Circle, Eraser, Rectangle, Triangle} from "../../tools";
import {CompactPicker} from "react-color";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const BoardSidebar = () => {
  const [viewBottom, setViewBottom] = useState('brush');
  const [fillPicker, setFillPicker] = useState(false);
  const [strokePicker, setStrokePicker] = useState(false);
  const [fillColor, setFillColor] = useState('#000');
  const [strokeColor, setStrokeColor] = useState('#000');
  const [iconStrokeColor, setIconStrokeColor] = useState("");
  const [iconFillColor, setIconFillColor] = useState("");

  const handleChangeBottom = (event, nextView) => {
    console.log(event)
    if (nextView !== null) {
      switch (nextView) {
        case 'brush':
          paintState.setPaint(new Brush(boardState.board, boardState.socket, boardState.sessionId));
          break;
        case 'eraser':
          paintState.setPaint(new Eraser(boardState.board, boardState.socket, boardState.sessionId));
          setStrokeColor("#ffffff");
          setIconStrokeColor("#000")
          break;
        case 'circle':
          paintState.setPaint(new Circle(boardState.board, boardState.socket, boardState.sessionId));
          break;
        case 'triangle':
          paintState.setPaint(new Triangle(boardState.board, boardState.socket, boardState.sessionId));
          break;
        case 'rectangle':
          paintState.setPaint(new Rectangle(boardState.board, boardState.socket, boardState.sessionId));
          break;
        default:
          break;
      }

      setViewBottom(nextView);
    }
  };

  const handleFillColorChange = ({hex}) => {
    if (hex === '#ffffff') {
      setIconFillColor("#000");
    } else {
      setIconFillColor("");
    }

    paintState.setFillColor(hex);

    setFillColor(hex);
  };

  const handleStrokeColorChange = ({hex}) => {
    if (hex === '#ffffff') {
      setIconStrokeColor("#000");
    } else {
      setIconStrokeColor("");
    }

    paintState.setStrokeColor(hex);

    setStrokeColor(hex);
  };

  const onToggleFillColorPicker = () => {
    setStrokePicker(false);
    setFillPicker(!fillPicker);
  }
  const onToggleStrokeColorPicker = () => {
    setFillPicker(false);
    setStrokePicker(!strokePicker);
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column'
        }}
        className='sidebar'
      >
        <IconButton onClick={onToggleStrokeColorPicker}>
          <BorderColorIcon sx={{color: strokeColor, stroke: iconStrokeColor}}/>
        </IconButton>
        <IconButton onClick={onToggleFillColorPicker}>
          <PaletteIcon sx={{color: fillColor, stroke: iconFillColor}}/>
        </IconButton>

        {strokePicker && viewBottom !== 'eraser' && (
          <Box sx={{position: 'absolute', left: 50}}>
            <CompactPicker
              color={strokeColor}
              onChangeComplete={handleStrokeColorChange}
            />
          </Box>
        )}

        {fillPicker && (
          <Box sx={{position: 'absolute', left: 50}}>
            <CompactPicker
              color={fillColor}
              onChangeComplete={handleFillColorChange}
            />
          </Box>
        )}

        <ToggleButtonGroup
          orientation="vertical"
          value={viewBottom}
          exclusive
          onChange={handleChangeBottom}
        >
          <ToggleButton value="brush" aria-label="Кисть">
            <BrushIcon/>
          </ToggleButton>
          <ToggleButton value="eraser" aria-label="Ластик">
            <AutoFixOffIcon/>
          </ToggleButton>
          <ToggleButton value="circle" aria-label="Круг">
            <RadioButtonUncheckedIcon/>
          </ToggleButton>
          <ToggleButton value="triangle" aria-label="Треугольник">
            <ChangeHistoryIcon/>
          </ToggleButton>
          <ToggleButton value="rectangle" aria-label="Прямоугольник">
            <CheckBoxOutlineBlankIcon/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </>
  );
};

export default BoardSidebar;

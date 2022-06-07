import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PaletteIcon from '@mui/icons-material/Palette';
import {Box, IconButton, Paper, Tooltip} from "@mui/material";
import {useState} from "react";
import {CompactPicker} from "react-color";
import BorderColorIcon from '@mui/icons-material/BorderColor';

//components
import {Brush, Circle, Eraser, Rectangle, Triangle} from "../../tools";
import {paintState, boardState} from "../../store";

const BoardSidebar = () => {
  const [viewBottom, setViewBottom] = useState('brush');
  const [fillPicker, setFillPicker] = useState(false);
  const [strokePicker, setStrokePicker] = useState(false);
  const [fillColor, setFillColor] = useState('#000');
  const [strokeColor, setStrokeColor] = useState('#000');
  const [iconStrokeColor, setIconStrokeColor] = useState("");
  const [iconFillColor, setIconFillColor] = useState("");

  // draw button listener
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
          setIconStrokeColor("#000");
          paintState.setStrokeColor('#fff');
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

  // fill color listener
  const handleFillColorChange = ({hex}) => {
    if (hex === '#ffffff') {
      setIconFillColor("#000");
    } else {
      setIconFillColor("");
    }

    setFillPicker(false);
    paintState.setFillColor(hex);
    setFillColor(hex);
  };

  // stroke color listener
  const handleStrokeColorChange = ({hex}) => {
    if (hex === '#ffffff') {
      setIconStrokeColor("#000");
    } else {
      setIconStrokeColor("");
    }

    setStrokePicker(false);
    paintState.setStrokeColor(hex);
    setStrokeColor(hex);
  };

  // toggle fill color picker
  const onToggleFillColorPicker = () => {
    setStrokePicker(false);
    setFillPicker(!fillPicker);
  }

  // toggle stroke color picker
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
          flexDirection: 'column',
        }}
        className='sidebar'
      >
        <Tooltip title="Обводка" placement="right">
          <IconButton onClick={onToggleStrokeColorPicker}>
            <BorderColorIcon sx={{color: strokeColor, stroke: iconStrokeColor}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Заливка" placement="right">
          <IconButton onClick={onToggleFillColorPicker}>
            <PaletteIcon sx={{color: fillColor, stroke: iconFillColor}}/>
          </IconButton>
        </Tooltip>

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
            <Tooltip title="Кисть" placement="right">
              <BrushIcon/>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="eraser" aria-label="Ластик">
            <Tooltip title="Ластик" placement="right">
              <AutoFixOffIcon/>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="circle" aria-label="Круг">
            <Tooltip title="Круг" placement="right">
              <RadioButtonUncheckedIcon/>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="triangle" aria-label="Треугольник">
            <Tooltip title="Треугольник" placement="right">
              <ChangeHistoryIcon/>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="rectangle" aria-label="Прямоугольник">
            <Tooltip title="Прямоугольник" placement="right">
              <CheckBoxOutlineBlankIcon/>
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </>
  );
};

export default BoardSidebar;
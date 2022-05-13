import {observer} from "mobx-react-lite";
import {useEffect, useRef, useState} from "react";
import boardState from "../../store/boardState";
import paintState from "../../store/paintState";
import {Brush, Circle, Eraser, Rectangle, Triangle} from "../../tools";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import userState from "../../store/userState";
import axios from "axios";

const Board = observer(() => {
  const boardRef = useRef()
  const [modal, setModal] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState('');

  useEffect(() => {
    boardState.setBoard(boardRef.current);
    setLocation(window.location.pathname.replace('/', ''));

    let ctx = boardRef.current.getContext('2d')
    axios.get(`http://localhost:5000/image?id=${window.location.pathname.replace('/', '')}`)
      .then(response => {
        const img = new Image()
        img.src = response.data
        img.onload = () => {
          ctx.clearRect(0, 0, boardRef.current.width, boardRef.current.height)
          ctx.drawImage(img, 0, 0, boardRef.current.width, boardRef.current.height)
        }
      })
  }, []);

  useEffect(() => {
    if (userState.username) {
      const socket = new WebSocket('ws://localhost:5000/');
      boardState.setSocket(socket);
      boardState.setSessionId(location);
      paintState.setPaint(new Brush(boardRef.current, socket, location));
      socket.onopen = () => {
        console.log('Completed')
        socket.send(JSON.stringify({
          username: userState.username,
          id: location,
          method: "connection"
        }))
      };

      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.username} connected`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
          default:
            break;
        }
      }
    }
  }, [userState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = boardRef.current.getContext('2d');
    switch (figure.type) {
      case "brush":
        Brush.paint(ctx, figure.x, figure.y);
        break;
      case 'eraser':
        Eraser.eraserPaint(ctx, figure.x, figure.y);
        break;
      case 'finish':
        ctx.beginPath();
        break;
      case 'rectangle':
        Rectangle.staticPaint(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
        break;
      case 'triangle':
        Triangle.staticPaint(ctx, figure.x, figure.y, figure.x2, figure.y2, figure.x3, figure.y3, figure.color);
        break;
      case 'circle':
        Circle.staticPaint(ctx, figure.x, figure.y, figure.r, figure.color);
        break;
      default:
        break;
    }
  }

  const handleChange = e => {
    setTitle(e.target.value);
  }

  const connectServer = () => {
    userState.setUsername(title);

    setModal(false);
  }


  const mouseDownHandler = () => {
    boardState.clickUndo(boardRef.current.toDataURL());

    axios.post(`http://localhost:5000/image?id=${location}`, {img: boardRef.current.toDataURL()})
      .then(response => console.log(response.data))
  };

  return (
    <>
      <div className='board__container'>
        <canvas className='canvas' ref={boardRef} width={1700} height={750} onMouseDown={() => mouseDownHandler()}/>
      </div>
      <Dialog open={modal} onClose={() => {
      }}>
        <DialogTitle>Введите имя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите имя строка не должна быть пустой
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={connectServer}>Войти</Button>
        </DialogActions>
      </Dialog>
    </>
  )
});

export default Board;
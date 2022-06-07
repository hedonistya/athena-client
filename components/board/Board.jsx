import {observer} from "mobx-react-lite";
import {useEffect, useRef, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import axios from "axios";

// components
import {boardState, paintState, userState} from "../../store";
import {Brush, Circle, Eraser, Rectangle, Triangle} from "../../tools";
import {authWithGoogleProvider} from "../../firebase";

const Board = observer(() => {
  const boardRef = useRef()
  const [modal, setModal] = useState(true);
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    boardState.setBoard(boardRef.current);
    setLocation(window.location.pathname.replace('/', ''));

    axios.get(`http://localhost:5000/users?id=${window.location.pathname.replace('/', '')}`).then(response => {
      setOwner(response.data.owner);
      console.log(owner);
    })

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
  }, [owner]);

  useEffect(() => {
    userState.setUsername(localStorage.getItem("displayNameAthena"));
    if (userState.username) {
      const socket = new WebSocket('ws://localhost:5000/');
      setModal(false);
      boardState.setSocket(socket);
      boardState.setSessionId(location);
      paintState.setPaint(new Brush(boardRef.current, socket, location));
      socket.onopen = () => {
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
          case 'clear':
            boardState.clearCanvas();
            break;
          default:
            break;
        }
      }
    }
  }, [userState.username]);

  // check response type
  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = boardRef.current.getContext('2d');
    switch (figure.type) {
      case "brush":
        Brush.staticPaint(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
        break;
      case 'eraser':
        Eraser.eraserPaint(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case 'finish':
        ctx.beginPath();
        break;
      case 'rectangle':
        Rectangle.staticPaint(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor, figure.strokeWidth, figure.fillColor);
        break;
      case 'triangle':
        Triangle.staticPaint(ctx, figure.x, figure.y, figure.x2, figure.y2, figure.x3, figure.y3, figure.color, figure.strokeColor, figure.strokeWidth, figure.fillColor);
        break;
      case 'circle':
        Circle.staticPaint(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor, figure.strokeWidth, figure.fillColor);
        break;
      default:
        break;
    }
  };

  // get auth
  const connectServer = () => {
    authWithGoogleProvider();

    setModal(false);
  };

  // get action
  const mouseDownHandler = () => {
    axios.post(`http://localhost:5000/image?id=${location}`, {img: boardRef.current.toDataURL()})
      .then(response => console.log(response.data))
  };

  return (
    <>
      <div className='board__container'>
        <canvas className='canvas' ref={boardRef} width={1700} height={750} onMouseUp={() => mouseDownHandler()}/>
      </div>
      <Dialog open={modal} onClose={() => {
      }}>
        <DialogTitle sx={{textAlign: 'center'}}>Войдите в аккаунт</DialogTitle>
        <DialogContent>
          <DialogContentText>
            После нажатия на кнопку появится возможность авторизоваться с помощью Google.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={connectServer}>Войти</Button>
        </DialogActions>
      </Dialog>
    </>
  )
});

export default Board;
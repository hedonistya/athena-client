//components
import {boardState} from "../store";

/**
 * Create image file and save
 * **/
const saveImage = () => {
  const dataUrl = boardState.board.toDataURL()
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = boardState.sessionId + ".jpeg"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
};

export default saveImage;
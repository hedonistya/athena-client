//components
import {boardState} from "../store";

/**
 * Create image file and save
 * **/
const saveImage = () => {
  const result = boardState.board.toDataURL()
  const a = document.createElement('a')
  a.href = result
  a.download = boardState.sessionId + ".jpeg"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
};

export default saveImage;
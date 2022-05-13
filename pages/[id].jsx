import {Board, BoardAppbar, BoardSidebar, Toolbar} from "../components";

const BoardMain = () => {

  return (
    <>
      <div className='board'>
        <BoardAppbar/>
        <Toolbar/>
        <BoardSidebar/>
        <Board/>
      </div>
    </>
  )
};

export default BoardMain;

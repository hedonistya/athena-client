// Components
import {Board, BoardAppbar, BoardSidebar, Toolbar} from "../components";
import Head from "next/head";

const BoardMain = () => {
  return (
    <>
      <Head>
        <title>Athena board</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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

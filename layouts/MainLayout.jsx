import {Box} from "../styles/mainLayout";
import {Appbar, Content, CreateButton, Navbar} from "../components";


const MainLayout = () => {
  return (
    <>
      <Appbar/>
      <Box>
        <Navbar/>
        <Content/>
        <CreateButton/>
      </Box>
    </>
  )
};

export default MainLayout;
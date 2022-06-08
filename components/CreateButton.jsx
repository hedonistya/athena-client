import AddIcon from '@mui/icons-material/Add';
import {useRouter} from "next/router";
import {Fab, Box} from "@mui/material";
import axios from "axios";

// components
import {getCode} from "../helpers";

const CreateButton = () => {
  const router = useRouter();

  // get page and send request to server
  const getPage = () => {
    const test = getCode();

    axios.post(`http://45.90.35.46:5000/users?id=${test}`, {owner: localStorage.getItem('displayNameAthena')})
      .then(response => console.log(response.data));

    router.push(`/${test}`).then(() => {
    });
  };

  return (
    <Box>
      <Fab color="primary" aria-label="add"
           sx={{position: 'fixed', bottom: '1.5rem', right: '1.5rem'}}
           onClick={getPage}
      >
        <AddIcon/>
      </Fab>
    </Box>
  );
};

export default CreateButton;
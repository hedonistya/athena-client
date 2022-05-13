import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import {getCode} from "../helpers";
import {useRouter} from "next/router";
import {Fab} from "@mui/material";
import userState from "../store/userState";
import {observer} from "mobx-react-lite";

const CreateButton = observer(() => {
  const router = useRouter();

  const getPage = () => {
    const test = getCode();

    userState.users.push({
      name: localStorage.getItem("displayNameAthena"),
      photo: localStorage.getItem("userAvatarAthena"),
      owner: true,
      permission: true,
      code: test,
      boardTitle: 'Без названия',
    });

    router.push(`/${test}`).then(() => {
      console.log(`Routing to -> ${test}`);
      console.log(userState.users);
    });
  }

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
});

export default CreateButton;

import {CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

// components
import {Card, ContainerContent} from "../styles/content";
import cardState from "../store/cardState";
import {deleteData} from "../firebase";

const Content = observer(() => {
  const router = useRouter();

  // get page
  const getPage = async (code) => {
    await router.push(`/${code}`);
  };
  return (
    <>
      <ContainerContent>
        {cardState.cardResult.map((item) =>
          <Card key={item.id}>
            <CardMedia
              sx={{borderRadius: '10px 10px 0 0'}}
              component="img"
              height="140"
              image={item.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.ownerName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => getPage(item.code)}>Открыть</Button>
              <Button size="small" onClick={() => deleteData(item.id, item.code)}>Удалить</Button>
            </CardActions>
          </Card>
        )}
      </ContainerContent>
    </>
  )
});

export default Content;
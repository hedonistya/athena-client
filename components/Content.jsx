import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Card, ContainerContent} from "../styles/content";
import cardState from "../store/cardState";
import {observer} from "mobx-react-lite";

const Content = observer(() => {
  return (
    <>
      <ContainerContent>
        {cardState.cardResult.map((item) =>
          <Card key={item.id}>
          <CardMedia
          sx={{borderRadius: '10px 10px 0 0'}}
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/athena-101c4.appspot.com/o/rYzLbaF0nK.png?alt=media&token=f80fa3c2-a206-4a1f-8158-6117e2c01d61"
          alt="green iguana"
          />
          <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.author}
          </Typography>
          </CardContent>
          <CardActions>
          <Button size="small">Открыть</Button>
          <Button size="small">Удалить</Button>
          </CardActions>
          </Card>
          )}
      </ContainerContent>
    </>
  )
});

export default Content;
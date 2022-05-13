import {styled} from "@mui/material/styles";
import {Container} from "@mui/material";

export const ContainerContent = styled(Container)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}));

export const Card = styled('div')(({theme}) => ({
  width: '250px',
  marginRight: '25px',
  background: '#edf4ff',
  borderRadius: '10px',
  marginBottom: "25px"
}));
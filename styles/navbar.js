import {styled} from "@mui/material/styles";

export const BoxNavbar = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center'
}));

export const BoxRight = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));
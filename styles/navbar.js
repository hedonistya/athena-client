import {styled} from "@mui/material/styles";

// custom component style
export const BoxNavbar = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center'
}));

// custom component style
export const BoxRight = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));
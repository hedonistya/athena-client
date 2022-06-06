import {styled} from "@mui/material/styles";

// custom component style
export const BoxToolbar = styled('div')(({theme}) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  background: 'white',
  padding: '0 24px',
}));
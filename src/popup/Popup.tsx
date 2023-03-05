import { ReactElement } from 'react';
import Box from '@mui/material/Box';

const Popup = (): ReactElement => {
  document.body.style.width = '15rem';
  document.body.style.height = '15rem';
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Popup</h1>
    </Box>
  );
};

export default Popup;

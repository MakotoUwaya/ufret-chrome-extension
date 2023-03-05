import { ReactElement } from 'react';
import Box from '@mui/material/Box';

const Welcome = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Welcome</h1>
    </Box>
  );
};

export default Welcome;

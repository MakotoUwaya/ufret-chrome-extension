import { ReactElement } from 'react';
import Box from '@mui/material/Box';

const Options = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Options</h1>
    </Box>
  );
};

export default Options;

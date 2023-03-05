import { ReactElement, useState } from 'react';
import { type SxProps, type Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from './counterSlice';

const rowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle: SxProps<Theme> = {
  appearance: 'none',
  background: 'none',
  paddingX: 1.5,
  marginX: 0.5,
  outline: 'none',
  border: '2px solid transparent',
  color: 'rgb(112, 76 ,182)',
  paddingBottom: 0.5,
  cursor: 'pointer',
  backgroundColor: 'rgba(112, 76 ,182, 0.1)',
  borderRadius: 0.25,
  transition: 'all 0.15s',
  ':hover': {
    border: '2px solid rgba(112, 76 ,182, 0.4)',
  },
  ':focus': {
    border: '2px solid rgba(112, 76 ,182, 0.4)',
  },
  ':active': {
    backgroundColor: 'rgba(112, 76 ,182, 0.2)',
  },
};

const asyncButtonStyle: SxProps<Theme> = {
  ...buttonStyle,
  composes: 'button',
  position: 'relative',
  ':after': {
    content: 'none',
    backgroundColor: 'rgba(112, 76, 182, 0.15)',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    opacity: 0,
    transition: 'width 1s linear, opacity 0.5s ease 1s',
  },
  ':active:after': {
    width: '0%',
    opacity: 1,
    transition: '0s',
  },
};

const valueStyle: SxProps<Theme> = {
  fontSize: '78px',
  paddingX: 2,
  marginTop: 0.25,
};

const textboxStyle: SxProps<Theme> = {
  marginX: 1,
};

export const Counter = (): ReactElement => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <Box>
      <Box
        sx={{
          ...rowStyle,
          marginBottom: 2,
        }}
      >
        <Button
          sx={{ ...buttonStyle, fontSize: '24px' }}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Typography sx={valueStyle}>{count}</Typography>
        <Button
          sx={{ ...buttonStyle, fontSize: '24px' }}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Box>
      <Box sx={rowStyle}>
        <TextField
          sx={textboxStyle}
          size="small"
          aria-label="Set increment amount"
          label="Number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button sx={buttonStyle} onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </Button>
        <Button sx={asyncButtonStyle} onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </Button>
        <Button sx={buttonStyle} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </Button>
      </Box>
    </Box>
  );
};

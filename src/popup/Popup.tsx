import { ReactElement, useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import type { MySettings } from '../shared/types/setting';

const Popup = (): ReactElement => {
  document.body.style.width = '15rem';
  document.body.style.height = '15rem';

  const bucket = getBucket<MySettings>('my_ufret_settings', 'sync');

  const [scoreKey, setScoreKey] = useState(0);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selectedScoreKey = Number(event.target.value);
    bucket.set({ selectedScoreKey });
    setScoreKey(selectedScoreKey);
  };

  useEffect(() => {
    (async () => {
      const settings = await bucket.get();
      if (settings.selectedScoreKey) {
        setScoreKey(settings.selectedScoreKey);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 0.5,
      }}
    >
      <h1>Settings</h1>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="select-score-key-label">Score Key</InputLabel>
          <Select
            labelId="select-score-key-label"
            id="select-score-key"
            defaultValue={0}
            value={scoreKey}
            label="Selected key"
            onChange={handleChange}
          >
            <MenuItem value={2}>+2(1音下げ)</MenuItem>
            <MenuItem value={1}>+1(半音下げ)</MenuItem>
            <MenuItem value={0}>Original</MenuItem>
            <MenuItem value={-1}>-1</MenuItem>
            <MenuItem value={-2}>-2</MenuItem>
            <MenuItem value={-3}>-3</MenuItem>
            <MenuItem value={-4}>-4</MenuItem>
            <MenuItem value={-5}>-5</MenuItem>
            <MenuItem value={-6}>-6</MenuItem>
            <MenuItem value={-7}>-7</MenuItem>
            <MenuItem value={-8}>-8</MenuItem>
            <MenuItem value={-9}>-9</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Popup;

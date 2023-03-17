import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { AppBar } from '../app-bar';
import { TimeRange } from '../../types';
import { SelectProps } from '../select';

const selectProps: SelectProps = {
  label: 'Today',
  values: [
    { id: TimeRange.TODAY, value: TimeRange.TODAY, text: 'Today' },
    { id: TimeRange.YESTERDAY, value: TimeRange.YESTERDAY, text: 'Yesterday' },
    { id: TimeRange.WEEK, value: TimeRange.WEEK, text: 'Last 7 days' },
    { id: TimeRange.MONTH, value: TimeRange.MONTH, text: 'This Month' },
  ]
};

export const BaseLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
      <Box sx={{ display: 'flex' }}>
        <AppBar title='Traffic' selectProps={selectProps} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            maxWidth: '1000px',
            margin: '80px auto'
          }}
        >
          {children}
        </Box>
      </Box>
  );
};

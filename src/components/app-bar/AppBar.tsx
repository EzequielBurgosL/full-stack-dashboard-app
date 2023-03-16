import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Select, SelectProps } from '../select';

const StyledAppBar = styled(MuiAppBar)`
  padding: 12px 30px;
  flex-direction: row;
`;

export type AppBarProps = {
  title: string;
  selectProps: SelectProps;
};

export const AppBar = ({ title, selectProps }: AppBarProps) => {
  return (
    <StyledAppBar>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, alignSelf: 'center' }}
      >
        {title}
      </Typography>
      {selectProps && (
        <Select
          values={selectProps.values}
          label={selectProps.label}
        />
      )}
    </StyledAppBar>
  );
};

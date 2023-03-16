import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import { TimeRangeContext, TimeRangeContextType } from '../../context/timeRange';

export type SelectProps = {
  label: string;
  values: MenuItem[];
};

type MenuItem = { id: string; value: string; text: string; };

export function Select({ values, label }: SelectProps) {
  const [value, setValue] = useState('');
  const { setSelectedValue } = useContext(TimeRangeContext) as TimeRangeContextType;

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    setSelectedValue(event.target.value as string);
  };

  return (
    <FormControl style={{ minWidth: 110 }} size={'small'}>
      <InputLabel
        id="simple-select-label"
        style={{ color: 'white' }}
      >
        {label}
      </InputLabel>
      {values.length && (
        <MuiSelect
          labelId="simple-select-label"
          id="simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent'
            },
            '& .MuiSvgIcon-root': {
              color: 'white'
            },
            color: 'white'
          }}
        >
          {values.map(({ id, text, value }: MenuItem) => (
            <MenuItem key={id} value={value}>{text}</MenuItem>
          ))}
        </MuiSelect>
      )}
    </FormControl>
  )
}
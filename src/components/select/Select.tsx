import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MuiMenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import { TimeRangeContext, TimeRangeContextType } from '../../context/timeRange';

export type SelectProps = {
  label: string;
  values: MenuItem[];
};

type MenuItem = { id: string; value: string; text: string; };

export function Select({ values, label }: SelectProps) {
  const { selectedValue, setSelectedValue } = useContext(TimeRangeContext) as TimeRangeContextType;
  const [value, setValue] = useState(selectedValue || '');

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
        {!value && label}
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
            <MuiMenuItem key={id} value={value}>{text}</MuiMenuItem>
          ))}
        </MuiSelect>
      )}
    </FormControl>
  )
}
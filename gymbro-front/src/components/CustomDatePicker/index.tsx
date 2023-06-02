import { BaseTextFieldProps } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { Moment } from 'moment';
import React from 'react';

interface CustomDatePickerProps extends DesktopDatePickerProps<Moment> {
    TextFieldProps?: Partial<BaseTextFieldProps>;
  }
  
  const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    TextFieldProps,
    ...props
  }) => {
    const TextFieldPropsDefault = {
      fullWidth: true,
      color: 'primary',
      variant: 'outlined',
      onKeyDown: (e: any) => e.preventDefault(),
      ...TextFieldProps,
    } as any;
  
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
        //   format={DEFAULT_DATE_FORMAT}
          {...props}
          slotProps={{
            field: {
              InputProps: TextFieldPropsDefault,
            },
            textField: {
              InputLabelProps: {
                shrink: true,
              },
            },
          }}
        />
      </LocalizationProvider>
    );
  };
  
  export default CustomDatePicker;
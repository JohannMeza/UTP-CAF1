import {
  FormControl,
  InputBase,
  InputBaseProps,
  InputLabel,
} from '@mui/material';
import { FC } from 'react';

type InputComponentProps = InputBaseProps & {
  label?: string;
  htmlFor?: string;
};
export const InputComponent: FC<InputComponentProps> = (props) => (
  <FormControl variant="standard" fullWidth>
    <InputLabel htmlFor={props.htmlFor} size="normal" shrink>
      {props.label}
    </InputLabel>
    <InputBase {...props} />
  </FormControl>
);

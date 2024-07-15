import { ChangeEvent, FC } from 'react';
import { ModalComponent } from '@src/shared/component/modal/ModalComponent';
import { Button, Grid, TextField } from '@mui/material';
import { DataConfig, dataInitial } from '../FisicaView';

interface ModalProps {
  open: boolean
  setOpen: (key: boolean) => void
  title: string
  data: DataConfig
  setData: (data: DataConfig) => void
}

export const ModalConfig: FC<ModalProps> = ({ open, setOpen, title, data, setData }) => {
  const handleClickCancel = (): void => {
    setData(dataInitial);
    setOpen(false);
  };

  const handleClickSave = (): void => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    const dataValue = {
      ...data,
      [name]: value
    };

    setData(dataValue);
  };

  return (
    <ModalComponent open={open} fullWidth setOpen={handleClickCancel} title={title}>
      <Grid container p={2} spacing={2}>
        <Grid item xs={6}>
          <TextField label="Ángulo (θ)" name='angulo' value={data.angulo} onChange={handleChange} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Gravedad(g)" name='gravedad' value={data.gravedad} onChange={handleChange} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Altura(Yo)" name='altura' value={data.altura} onChange={handleChange} variant="outlined" fullWidth disabled />
        </Grid>
      </Grid>
  
      <Grid container p={2}>
        <Grid item xs={12} display={'flex'} justifyContent={'right'} gap={2}>
          <Button variant='contained' color='secondary' onClick={handleClickCancel}>Cancelar</Button>
          <Button variant='contained' color='primary' onClick={handleClickSave}>Guardar</Button>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
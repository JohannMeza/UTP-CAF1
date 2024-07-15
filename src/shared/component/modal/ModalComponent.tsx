import { FC } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import { Stack, IconButton, DialogTitle, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ModalComponentType = DialogProps & {
  open: boolean;
  setOpen: (prop: boolean) => void;
  title: string;
};
export const ModalComponent: FC<ModalComponentType> = (props) => {
  const { setOpen, title, children } = props;
  const handleClose = (): void => setOpen(false);

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <IconButton color="default" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {title}
        </Stack>
      </DialogTitle>

      {children}
    </Dialog>
  );
};

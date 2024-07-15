import { FC, PropsWithChildren } from 'react';
import logo from '@src/shared/assets/logo.png';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const AppbarComponent: FC<PropsWithChildren> = () => (
  <AppBar position="sticky" color='primary'>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <img src={logo} height={45} alt='Logo' />
      </Toolbar>
    </Container>
  </AppBar>
);

export default AppbarComponent;

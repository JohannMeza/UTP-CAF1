import { FC, PropsWithChildren } from 'react';
import { Box, Grid } from '@mui/material';
import { AccordionComponent, AccordionDetailsPrimary, AccordionSumaryPrimary } from './courses-styles';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FunctionsIcon from '@mui/icons-material/Functions';

export const CoursesView: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();

  return (
    <Box p={3}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item xs={8}>
          <AccordionComponent>
            <AccordionSumaryPrimary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Física
            </AccordionSumaryPrimary>
            <AccordionDetailsPrimary>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/fisica')}>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <FunctionsIcon color='secondary' />
                    </ListItemIcon>
                    <ListItemText primary="Movimiento Parabólico" />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetailsPrimary>
          </AccordionComponent>
        </Grid>
      </Grid>
    </Box>
  );
};
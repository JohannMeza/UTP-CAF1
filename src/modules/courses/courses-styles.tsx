import { styled } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const borderRadius: string = '0 0 8px 8px';

export const AccordionComponent = styled(Accordion)(({ theme }) => ({
  background: theme.palette.primary.main, 
  borderRadius: '8px !important',
  overflow: 'hidden'
}));

export const AccordionSumaryPrimary = styled(AccordionSummary)(({ theme }) => ({
  background: theme.palette.white.main,
  color: theme.palette.primary.main,
  borderRadius: borderRadius,
}));

export const AccordionDetailsPrimary = styled(AccordionDetails)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const AccordionSumarySecondary = styled(AccordionSummary)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  borderRadius: borderRadius,
}));

export const AccordionDetailsSecondary = styled(AccordionDetails)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));
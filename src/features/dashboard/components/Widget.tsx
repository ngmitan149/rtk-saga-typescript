import { Box, Paper, styled, Typography } from '@mui/material';
import React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <WidgetRootStyled>
      <Typography variant="button">{title}</Typography>

      <Box mt={2}>{children}</Box>
    </WidgetRootStyled>
  );
}

const WidgetRootStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

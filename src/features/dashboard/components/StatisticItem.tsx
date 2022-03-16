import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';


export interface StatisticItemProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {

  return (
    <StatisticItemRoot>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </StatisticItemRoot>
  );
}

const StatisticItemRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}))

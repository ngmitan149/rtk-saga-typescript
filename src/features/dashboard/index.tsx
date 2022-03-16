import { Female, Male, SsidChart } from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudentList, selectLowestStudentList, selectRankingByCity } from './dashboardSlice';


export default function Dashboard () {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading)
  const statistics = useAppSelector(selectDashboardStatistics)
  const highestStudentList = useAppSelector(selectHighestStudentList)
  const lowestStudentList = useAppSelector(selectLowestStudentList)
  const rankingByCityList = useAppSelector(selectRankingByCity)

  useEffect(() => {
    dispatch(dashboardActions.getData())
  }, [dispatch])

  return (
    <DashboardRootStyled>

      {/* Loading */}
      {loading && <LinearProgressStyled/>}

      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Male fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Female fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<SsidChart fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<SsidChart fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All students rankings */}
      <Box mt={5}>
        <Typography variant="h4">All Students</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Rankings by city */}
      <Box mt={5}>
        <Typography variant="h4">Rankings by city</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </DashboardRootStyled>
  );
}

const DashboardRootStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(1),
}))

const LinearProgressStyled = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-1),
  width: '100%',
}))

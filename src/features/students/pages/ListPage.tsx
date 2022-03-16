import { Button, LinearProgress, Pagination, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityEntities, selectCityIds, selectCityList } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';

export interface ListpageProps {
}

export default function Listpage (_props: ListpageProps) {
  const match = useRouteMatch();
  const history = useHistory();

  const dispatch = useAppDispatch()
  const studentList = useAppSelector(selectStudentList)
  const pagination = useAppSelector(selectStudentPagination)
  const loading = useAppSelector(selectStudentLoading);
  const filter = useAppSelector(selectStudentFilter)
  const cityMap = useAppSelector(selectCityEntities)
  const cityList = useAppSelector(selectCityList)

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter])

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page,
    }))
  }

  const handleSearchChange = (filter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(filter))
  }

  const handleFilterChange = (filter: ListParams) => {
    dispatch(studentActions.setFilter(filter))
  }

  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student?.id || '');

      toast.success('Remove student successfully!');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/edit/${student.id}`);
  };

  return (
    <StudentListRootStyled>
      {loading && <LinearProgressStyled />}
      <TitleContaierStyled>
        <Typography variant='h4'>Students</Typography>

        <LinkStyled to={`${match.url}/add`}>
          <Button variant='contained' color='primary'>Add New Student</Button>
        </LinkStyled>
      </TitleContaierStyled>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Student Table */}
      <StudentTable studentList={studentList} cityMap={cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent}/>

      <Box display='flex' justifyContent='center' my={2}>
        <Pagination shape="rounded" count={Math.ceil(pagination._totalRows / pagination._limit)} onChange={handlePageChange}/>
      </Box>
    </StudentListRootStyled>
  );
}

const StudentListRootStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(1),
}))

const LinearProgressStyled = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-1),
  width: '100%',
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
}))

const TitleContaierStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',

  marginBottom: theme.spacing(4),
}))


import { Button, LinearProgress, Pagination, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import studentApi from 'api/studentApi';
import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityEntities, selectCityIds, selectCityList } from 'features/city/citySlice';
import { ListParams, User } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
// import UserFilters from '../components/UserFilters';
import UserTable from '../components/UserTable';
import { selectUserFilter, selectUserList, selectUserLoading, selectUserPagination, userActions } from '../userSlice';

export interface ListpageProps {
}

export default function Listpage (_props: ListpageProps) {
  const match = useRouteMatch();
  const history = useHistory();

  const dispatch = useAppDispatch()
  const userList = useAppSelector(selectUserList)
  const pagination = useAppSelector(selectUserPagination)
  const loading = useAppSelector(selectUserLoading);
  const filter = useAppSelector(selectUserFilter)

  useEffect(() => {
    dispatch(userActions.fetchUserList(filter))
  }, [dispatch, filter])

  const handlePageChange = (e: any, page: number) => {
    dispatch(userActions.setFilter({
      ...filter,
      _page: page,
    }))
  }

  const handleSearchChange = (filter: ListParams) => {
    dispatch(userActions.setFilterWithDebounce(filter))
  }

  const handleFilterChange = (filter: ListParams) => {
    dispatch(userActions.setFilter(filter))
  }

  const handleRemoveUser = async (user: User) => {
    try {
      // Remove student API
      await userApi.remove(user?.id || '');

      toast.success('Remove student successfully!');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(userActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };

  const handleEditUser = async (user: User) => {
    history.push(`${match.url}/edit/${user.id}`);
  };

  return (
    <UserListRootStyled>
      {loading && <LinearProgressStyled />}
      <TitleContaierStyled>
        <Typography variant='h4'>Users</Typography>

        <LinkStyled to={`${match.url}/add`}>
          <Button variant='contained' color='primary'>Add New User</Button>
        </LinkStyled>
      </TitleContaierStyled>

      <Box mb={3}>
        {/* <UserFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        /> */}
      </Box>

      {/* User Table */}
      <UserTable userList={userList} onEdit={handleEditUser} onRemove={handleRemoveUser}/>

      <Box display='flex' justifyContent='center' my={2}>
        <Pagination shape="rounded" count={Math.ceil(pagination._totalRows / pagination._limit)} onChange={handlePageChange}/>
      </Box>
    </UserListRootStyled>
  );
}

const UserListRootStyled = styled(Box)(({ theme }) => ({
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


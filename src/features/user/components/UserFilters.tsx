import { Search } from '@mui/icons-material';
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export interface UserFiltersProps {
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function UserFilters ({ filter, onChange, onSearchChange }: UserFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      username_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  }

  const handleSortChange = (e: SelectChangeEvent<any>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  }

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      username_like: undefined,
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByUsername">Search by name</InputLabel>
            <OutlinedInput
              id="searchByUsername"
              label="Search by username"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4} lg={5}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value="username.asc">Name ASC</MenuItem>
              <MenuItem value="username.desc">Name DESC</MenuItem>
              <MenuItem value="role.asc">Role ASC</MenuItem>
              <MenuItem value="role.desc">Role DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

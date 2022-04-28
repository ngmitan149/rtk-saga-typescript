
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { User } from 'models';
import React, { useState } from 'react';


export interface UserTableProps {
  userList: User[];
  onEdit?: (user: User) => void;
  onRemove?: (user: User) => void;
}

export default function UserTable({ userList, onEdit, onRemove }: UserTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleRemoveConfirm = async (user: User) => {
    await onRemove?.(user);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
              <TableCell >Username</TableCell>
              <TableCell >Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell >{user.id}</TableCell>
                <TableCell >{user.username}</TableCell>
                <TableCell >{user.email}</TableCell>
                <TableCell align="right">
                  <EditButtonStyled variant="text" color='primary' onClick={() => onEdit?.(user)}>
                    Edit
                  </EditButtonStyled>
                  <Button variant="text" color='error' onClick={() => handleRemoveClick?.(user)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove a user?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove user named "{selectedUser?.username}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedUser as User)}
            color="error"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const EditButtonStyled = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2)
}))

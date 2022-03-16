
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';


export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City | undefined
  }
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = async (student: Student) => {
    await onRemove?.(student);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
              <TableCell >Name</TableCell>
              <TableCell >Gender</TableCell>
              <TableCell >Mark</TableCell>
              <TableCell >City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell >{student.id}</TableCell>
                <TableCell >{student.name}</TableCell>
                <TableCell >{capitalizeString(student.gender)}</TableCell>
                <TableCell >
                  <Box color={getMarkColor(student.mark)} fontWeight='bold'>{student.mark}</Box>
                </TableCell>
                <TableCell >{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <EditButtonStyled variant="text" color='primary' onClick={() => onEdit?.(student)}>
                    Edit
                  </EditButtonStyled>
                  <Button variant="text" color='error' onClick={() => handleRemoveClick?.(student)}>
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
          Remove a student?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
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

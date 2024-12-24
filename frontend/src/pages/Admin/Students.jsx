import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import { fetchClasses, fetchStudents } from "./Services/ApiServices.jsx";
import {
  Table,
  Container,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Paper,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  Modal,
  Fade,
} from "@mui/material";

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    loadStudents();
    loadClasses();
  }, []);

  const loadStudents = async () => {
    try {
      const studentsData = await fetchStudents();
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadClasses = async () => {
    try {
      const classesData = await fetchClasses();
      setClasses(classesData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getClassForStudent = (studentId) => {
    const studentClass = classes.find((cls) =>
      cls.students.includes(studentId)
    );
    return studentClass ? studentClass.className : "N/A";
  };

  const handleGradeSubmit = () => {
    if (selectedClass) {
      const filtered = students.filter(
        (student) => getClassForStudent(student._id) === selectedClass
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students); // If no class is selected, show all students
    }
  };

  //delete related stuff
  const [cmopen, setcmOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const deleteConfirmationModal = (studentID) => {
    setcmOpen(true);
    setSelectedStudent(studentID);
  };

  const handleDeleteStudent = async () => {
    try {
      await axios.delete(
        `http://localhost:3050/students/deleteStudent/${selectedStudent}`
      );
      window.alert("Student deleted successfully!");
      setcmOpen(false);
      loadStudents();
    } catch (error) {
      window.alert("Error during deletion" + error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Box
        sx={{ backgroundColor: "#e2e8f0", minHeight: "100vh", paddingTop: 4 }}
      >
        <Container maxWidth="xl">
          <Modal
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
            open={cmopen}
            onClose={() => setcmOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={cmopen}>
              <Box sx={Modalstyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                  Are You Sure About This Deletion?
                </Typography>
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleDeleteStudent();
                    }}
                  >
                    Yes
                  </Button>
                  <Button variant="contained" onClick={() => setcmOpen(false)}>
                    No
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
          <div className="pt-2 pb-2">View All Students By Grade</div>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="select-class-label">Class</InputLabel>
              <Select
                labelId="select-class-label"
                id="select-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Class"
              >
                <MenuItem key="" value="">
                  View All
                </MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls.className}>
                    {cls.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGradeSubmit}
            >
              Submit
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Index No</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Parent's Name</TableCell>
                  <TableCell>Parent Contact No</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.studentIndexNo}</TableCell>
                    <TableCell>{getClassForStudent(student._id)}</TableCell>
                    <TableCell>{student.parentName}</TableCell>
                    <TableCell>{student.parentEmail}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => deleteConfirmationModal(student._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </div>
  );
};

export default Students;

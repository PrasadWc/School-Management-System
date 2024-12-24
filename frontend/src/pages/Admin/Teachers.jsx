import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import { fetchTeachers } from "./Services/ApiServices.jsx";
import {
  Table,
  TableHead,
  Container,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Box,
  TextField,
  Typography,
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

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({
    teacherID: "",
    teacherName: "",
    teacherEmail: "",
    teacherContactNo: "",
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const teachers = await fetchTeachers();
      setTeachers(teachers);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (
      newTeacher.teacherID.trim() !== "" &&
      newTeacher.teacherName.trim() !== "" &&
      newTeacher.teacherEmail.trim() !== "" &&
      newTeacher.teacherContactNo.trim() !== ""
    ) {
      const newTeacherEntry = {
        ...newTeacher,
      };
      setTeachers([...teachers, newTeacherEntry]);
      setNewTeacher({
        teacherID: "",
        teacherName: "",
        teacherEmail: "",
        teacherContactNo: "",
      });
    }

    try {
      const response = await axios
        .post("http://localhost:3050/teachers/add", newTeacher)
        .then(() => {
          window.alert("Teacher Added successfully!");
        });
    } catch (error) {
      window.alert("Error during form submission: " + error.message);
      console.error("Error during form submission", error);
    }
  };
  //teacher delete related stuff
  const [cmopen, setcmOpen] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const deleteConfirmationModal = (teacherobjid) => {
    setcmOpen(true);
    setSelectedTeacher(teacherobjid);
  };

  const handleDeleteTeacher = async () => {
    try {
      await axios.delete(
        `http://localhost:3050/teachers/deleteTeacher/${selectedTeacher}`
      );
      window.alert("Teacher deleted successfully!");
      setcmOpen(false);
      loadTeachers();
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
                      handleDeleteTeacher();
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
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                borderRadius: 3,

                paddingLeft: 2,
                paddingTop: 1,
                paddingBottom: 1,
                marginBottom: 2,
                backgroundColor: "white",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Teachers
              </Typography>
              <Typography variant="h6" gutterBottom className="pb-2 underline">
                Add a Teacher
              </Typography>
              <Box
                component="form"
                sx={{ marginBottom: 3 }}
                onSubmit={handleAddTeacher}
              >
                <TextField
                  label="Enter teacher ID"
                  variant="outlined"
                  value={newTeacher.teacherID}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      teacherID: e.target.value,
                    })
                  }
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Enter teacher name"
                  variant="outlined"
                  value={newTeacher.teacherName}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      teacherName: e.target.value,
                    })
                  }
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Enter teacher email"
                  type="email"
                  variant="outlined"
                  value={newTeacher.teacherEmail}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      teacherEmail: e.target.value,
                    })
                  }
                  sx={{ marginRight: 2 }}
                />

                <TextField
                  label="Enter teacher contact"
                  variant="outlined"
                  value={newTeacher.teacherContactNo}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      teacherContactNo: e.target.value,
                    })
                  }
                  sx={{ marginRight: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ height: "56px" }}
                >
                  Add Teacher
                </Button>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom className="pt-2 underline">
              View All Teachers
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell>Teacher ID</TableCell>

                    <TableCell>Teacher Email</TableCell>
                    <TableCell>Teacher Contact No</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.teacherID}>
                      <TableCell>{teacher.teacherName}</TableCell>
                      <TableCell>{teacher.teacherID}</TableCell>

                      <TableCell>{teacher.teacherEmail}</TableCell>
                      <TableCell>{teacher.teacherContactNo}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteConfirmationModal(teacher._id)}
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
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Teachers;

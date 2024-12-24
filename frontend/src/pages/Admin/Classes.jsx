import React, { useState, useEffect, useMemo } from "react";
import NavigationBar from "./NavigationBar";
import { fetchClasses, fetchTeachers } from "./Services/ApiServices.jsx";
import axios from "axios";
import {
  Table,
  Container,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  TextField,
  Typography,
  Select,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  ListSubheader,
  InputAdornment,
  Backdrop,
  Modal,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const Classes = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    LoadTeachers();
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const classesData = await fetchClasses();
      setClasses(classesData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const LoadTeachers = async () => {
    try {
      const teachersData = await fetchTeachers();
      const teachers = teachersData.map((teacher) => ({
        name: teacher.teacherName,
        objectid: teacher._id,
      }));

      setAllOptions(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const [Grade, setGrade] = useState("");
  const [ClassName, setClassName] = useState("");
  const [Classteacher, setClassteacher] = useState("");
  const [classes, setClasses] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);

  const displayedOptions = useMemo(
    () =>
      searchText
        ? allOptions.filter((option) => containsText(option.name, searchText))
        : allOptions,
    [searchText, allOptions]
  );

  const handleAddClass = async (e) => {
    e.preventDefault();

    const updatedClass = {
      className: `${Grade}${ClassName}`,
      classTeacher: Classteacher,
    };

    const newClassEntry = {
      ...updatedClass,
    };

    setClasses([...classes, newClassEntry]);

    if (ClassName.trim() !== "" && Classteacher.trim() !== "" && Grade !== "") {
      try {
        await axios.post(
          "http://localhost:3050/classes/addClass",
          updatedClass
        );
        window.alert("Class Added successfully!");
        setGrade("");
        setClassName("");
        setClassteacher("");
      } catch (error) {
        window.alert("Error during form submission: " + error.message);
        console.error("Error during form submission", error);
      }
    }
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();

    const updatedClass = {
      className: `${Grade}${ClassName}`,
      classTeacher: Classteacher,
    };

    try {
      await axios.post(
        `http://localhost:3050/classes/updateClass/${selectedClass._id}`,
        updatedClass
      );
      window.alert("Class updated successfully!");
      loadClasses(); // Reload classes after update
      handleClose();
    } catch (error) {
      window.alert("Error during form submission: " + error.message);
      console.error("Error during form submission", error);
    }
  };

  const handleDeleteClass = async () => {
    try {
      await axios.delete(
        `http://localhost:3050/classes/deleteClass/${selectedClass._id}`
      );
      window.alert("Class deleted successfully!");
      setcmOpen(false);
      loadClasses();
    } catch (error) {
      window.alert("Error during deletion" + error.message);
    }
  };
  //cm = delete confirmation modal dialog
  const [cmopen, setcmOpen] = React.useState(false);

  const deleteConfirmationModal = (classItem) => {
    setcmOpen(true);
    setSelectedClass(classItem);
  };

  const openUpdateModal = (classItem) => {
    setSelectedClass(classItem);
    setGrade(classItem.className.match(/Grade \d/)[0]);
    setClassName(classItem.className.replace(/Grade \d/, "").trim());
    setClassteacher(classItem.classTeacher._id);
    handleOpen();
  };

  return (
    <div>
      <NavigationBar />
      <Box
        sx={{ backgroundColor: "#e2e8f0", minHeight: "100vh", paddingTop: 4 }}
      >
        <Container maxWidth="xl">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={Modalstyle}>
                <form onSubmit={handleUpdateClass}>
                  <TextField
                    label="Class Name"
                    variant="outlined"
                    value={ClassName}
                    onChange={(e) => setClassName(e.target.value)}
                    className="min-w-[200px]"
                  />
                  <FormControl
                    variant="outlined"
                    sx={{ minWidth: 250 }}
                    size="large"
                  >
                    <InputLabel> Select Teacher</InputLabel>
                    <Select
                      className="mt-2 mb-2"
                      MenuProps={{ autoFocus: false }}
                      value={Classteacher}
                      label="Select Teacher"
                      onChange={(e) => setClassteacher(e.target.value)}
                      onClose={() => setSearchText("")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <ListSubheader>
                        <TextField
                          size="small"
                          autoFocus
                          placeholder="Type to search..."
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {displayedOptions.map((option, i) => (
                        <MenuItem key={i} value={option.objectid}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Update Class Details
                  </Button>
                </form>
              </Box>
            </Fade>
          </Modal>

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
                      // Handle the delete action here
                      handleDeleteClass();
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
            <Typography variant="h4" component="h2" className="mb-5 pb-2">
              Classes
            </Typography>
            <form
              onSubmit={handleAddClass}
              className="mb-5 flex flex-wrap gap-4 items-center"
            >
              <FormControl
                variant="outlined"
                sx={{ minWidth: 200 }}
                size="large"
              >
                <InputLabel>Grade</InputLabel>
                <Select
                  value={Grade}
                  onChange={(e) => setGrade(e.target.value)}
                  label="Grade"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Grade 1">Grade 1</MenuItem>
                  <MenuItem value="Grade 2">Grade 2</MenuItem>
                  <MenuItem value="Grade 3">Grade 3</MenuItem>
                  <MenuItem value="Grade 4">Grade 4</MenuItem>
                  <MenuItem value="Grade 5">Grade 5</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Class Name"
                variant="outlined"
                value={ClassName}
                onChange={(e) => setClassName(e.target.value)}
                className="min-w-[200px]"
              />
              <FormControl
                variant="outlined"
                sx={{ minWidth: 250 }}
                size="large"
              >
                <InputLabel> Select Teacher</InputLabel>
                <Select
                  MenuProps={{ autoFocus: false }}
                  value={Classteacher}
                  label="Select Teacher"
                  onChange={(e) => setClassteacher(e.target.value)}
                  onClose={() => setSearchText("")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <ListSubheader>
                    <TextField
                      size="small"
                      autoFocus
                      placeholder="Type to search..."
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          e.stopPropagation();
                        }
                      }}
                    />
                  </ListSubheader>
                  {displayedOptions.map((option, i) => (
                    <MenuItem key={i} value={option.objectid}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Add Class
              </Button>
            </form>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>Class Teacher</TableCell>
                  <TableCell>Student Count</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(classes) &&
                  classes.map((classItem, index) => (
                    <TableRow key={index}>
                      <TableCell>{classItem.className}</TableCell>
                      <TableCell>
                        {classItem.classTeacher.teacherName}
                      </TableCell>
                      <TableCell>{classItem.students.length}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            onClick={() => openUpdateModal(classItem)}
                            variant="contained"
                            color="primary"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => deleteConfirmationModal(classItem)}
                            variant="contained"
                            color="secondary"
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

export default Classes;

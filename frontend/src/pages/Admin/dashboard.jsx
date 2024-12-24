// AdminDashboard.js
import React from "react";
import NavigationBar from "./NavigationBar";
import { useState, useEffect } from "react";
import {
  fetchClasses,
  fetchStudents,
  fetchTeachers,
} from "./Services/ApiServices";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";

const AdminDashboard = () => {
  const [classCount, setClassCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [announcementsCount, setAnnouncementsCount] = useState(0);

  const loadStudents = async () => {
    try {
      const studentData = await fetchStudents();
      setStudentsCount(studentData.length);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTeachers = async () => {
    try {
      const teachersData = await fetchTeachers();
      setTeachersCount(teachersData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const loadClasses = async () => {
    try {
      const classData = await fetchClasses();
      setClassCount(classData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3050/adminannouncements/allAdminAnnouncements/"
      );
      setAnnouncementsCount(response.data.length);
    } catch (error) {
      console.error("Error fetching the announcements!", error);
    }
  };

  const handlePostAnnouncement = async (event) => {
    event.preventDefault();
    const newAnnouncement = {
      Audience: event.target.audience.value,
      announcementCaption: event.target.title.value,
      announcementBody: event.target.description.value,
    };

    try {
      await axios.post(
        "http://localhost:3050/adminannouncements/addAdminAnnouncement/",
        newAnnouncement
      );
      loadAnnouncements(); // Reload announcements after posting a new one
      event.target.reset(); // Clear form fields
    } catch (error) {
      console.error("Error posting the announcement!", error);
    }
  };

  useEffect(() => {
    loadClasses();
    loadTeachers();
    loadStudents();
    loadAnnouncements();
  }, []);

  return (
    <div>
      <NavigationBar />
      <Box
        sx={{ backgroundColor: "#e2e8f0", minHeight: "100vh", paddingTop: 4 }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 3,
                    height: 170,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#e0f7fa",
                      width: 80,
                      height: 80,
                      marginRight: 4,
                    }}
                  >
                    <SchoolIcon fontSize="large" color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Classes
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {classCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 3,
                    height: 170,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#e3f2fd",
                      width: 80,
                      height: 80,
                      marginRight: 4,
                    }}
                  >
                    <PersonIcon fontSize="large" color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Teachers
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {teachersCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 3,
                    height: 170,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#fff3e0",
                      width: 80,
                      height: 80,
                      marginRight: 4,
                    }}
                  >
                    <PeopleIcon fontSize="large" color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Students
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {studentsCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 3,
                    height: 170,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#ffebee",
                      width: 80,
                      height: 80,
                      marginRight: 4,
                    }}
                  >
                    <EventIcon fontSize="large" color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Announcements
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {announcementsCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Post an Event
                  </Typography>
                  <TextField
                    label="Event Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Event Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Box display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Post Event
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Post an Announcement
                  </Typography>
                  <form onSubmit={handlePostAnnouncement}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Audience</InputLabel>
                      <Select label="Audience" name="audience" required>
                        <MenuItem value="Both">Both</MenuItem>
                        <MenuItem value="Teachers">Teachers</MenuItem>
                        <MenuItem value="Students">Students</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Announcement Caption"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="title"
                      required
                    />
                    <TextField
                      label="Announcement Body"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      name="description"
                      required
                    />
                    <Box display="flex" justifyContent="center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        Post Announcement
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AdminDashboard;

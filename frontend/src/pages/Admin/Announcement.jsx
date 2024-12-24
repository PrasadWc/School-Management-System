import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch all announcements on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3050/adminannouncements/allAdminAnnouncements/")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the announcements!", error);
      });
  }, []);

  const handlePostAnnouncement = (event) => {
    event.preventDefault();
    const newAnnouncement = {
      Audience: event.target.audience.value,
      announcementCaption: event.target.title.value,
      announcementBody: event.target.description.value,
    };

    axios
      .post(
        "http://localhost:3050/adminannouncements/addAdminAnnouncement/",
        newAnnouncement
      )
      .then((response) => {
        // Update the announcements list with the newly posted announcement
        setAnnouncements((prevAnnouncements) => [
          response.data,
          ...prevAnnouncements,
        ]);
        // Clear form fields
        event.target.reset();
      })
      .catch((error) => {
        console.error("There was an error posting the announcement!", error);
      });
  };

  return (
    <div>
      <NavigationBar />
      <Box
        sx={{ backgroundColor: "#e2e8f0", minHeight: "100vh", paddingTop: 4 }}
      >
        <Container maxWidth="xl">
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
                      label="Announcement Title"
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
          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              Announcements Feed
            </Typography>
            {announcements.map((announcement, index) => (
              <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">
                  {announcement.announcementCaption}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {announcement.Audience}
                </Typography>
                <Typography variant="body1">
                  {announcement.announcementBody}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Announcement;

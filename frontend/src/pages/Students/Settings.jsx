import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from "@mui/material";
import Sidebar from "./Sidebar";

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Container
        maxWidth="md"
        style={{ marginTop: "20px", marginLeft: "20rem" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Settings
        </Typography>

        {/* Profile Settings */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Profile Settings
            </Typography>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Phone Number"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Account Settings
            </Typography>
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Notification Settings
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Email Notifications</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="enabled"
                  control={<Radio />}
                  label="Enabled"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="Disabled"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ marginTop: "10px" }}>
              <FormLabel component="legend">SMS Notifications</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="enabled"
                  control={<Radio />}
                  label="Enabled"
                />
                <FormControlLabel
                  value="disabled"
                  control={<Radio />}
                  label="Disabled"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Privacy Settings
            </Typography>
            <FormControlLabel
              control={<Switch />}
              label="Make my profile public"
            />
            <FormControlLabel
              control={<Switch />}
              label="Enable 2-factor authentication"
            />
          </CardContent>
        </Card>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Save Changes
        </Button>
      </Container>
    </div>
  );
};

export default Settings;

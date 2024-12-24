import React from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import Sidebar from "./Sidebar";

const Performance = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Container
        maxWidth="md"
        style={{ marginTop: "20px", marginLeft: "20rem" }}
      >
        {" "}
        {/* Add marginLeft to make space for the sidebar */}
        <Typography variant="h3" component="h1" gutterBottom>
          Performance Dashboard
        </Typography>
        <Card
          elevation={3}
          style={{ marginBottom: "20px", background: "#FCE38A" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              style={{ color: "#7209B7" }}
            >
              Recent Grades
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: "#7209B7" }}
            >
              You currently have no recent grades.
            </Typography>
          </CardContent>
        </Card>
        <Card
          elevation={3}
          style={{ marginBottom: "20px", background: "#ADEFD1" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              style={{ color: "#FFC3A0" }}
            >
              Academic Performance Over Time
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: "#FFC3A0" }}
            >
              Your academic performance data over time is not available.
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card elevation={3} style={{ background: "#F38181" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  style={{ color: "#7209B7" }}
                >
                  Progress Summary
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#7209B7" }}
                >
                  Your progress summary is not available.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3} style={{ background: "#FCE38A" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  style={{ color: "#7209B7" }}
                >
                  Attendance Summary
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#7209B7" }}
                >
                  Your attendance summary is not available.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Performance;

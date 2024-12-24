import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Sidebar from "./Sidebar";

const announcementsData = [
  {
    title: "New Assignment Released",
    date: "2024-06-10",
    description:
      "A new assignment on React Components has been released. Please submit by 2024-06-17.",
  },
  {
    title: "Upcoming School Event",
    date: "2024-06-12",
    description:
      "Join us for the annual school festival on 2024-06-20. There will be games, food, and fun activities for all.",
  },
  {
    title: "Holiday Notice",
    date: "2024-06-08",
    description:
      "School will be closed on 2024-06-14 due to a public holiday. Classes will resume on 2024-06-15.",
  },
];

const Announcements = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Container
        maxWidth="md"
        style={{ marginTop: "20px", marginLeft: "20rem" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Announcements
        </Typography>
        {announcementsData.map((announcement, index) => (
          <Card key={index} style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {announcement.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {announcement.date}
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body1">
                {announcement.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Announcements;

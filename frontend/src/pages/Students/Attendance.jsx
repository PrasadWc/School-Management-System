import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import Sidebar from "./Sidebar";

const attendanceData = [
  { date: "2024-06-01", status: "Present" },
  { date: "2024-06-02", status: "Absent" },
  { date: "2024-06-03", status: "Present" },
  { date: "2024-06-04", status: "Late" },
  { date: "2024-06-05", status: "Present" },
];

const Attendance = () => {
  const [filter, setFilter] = React.useState("All");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData =
    filter === "All"
      ? attendanceData
      : attendanceData.filter((record) => record.status === filter);

  return (
    <div className="flex">
      <Sidebar />
      <Container
        maxWidth="md"
        style={{ marginTop: "20px", marginLeft: "20rem" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Attendance
        </Typography>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filter}
                onChange={handleChange}
                label="Filter by Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Late">Late</MenuItem>
              </Select>
            </FormControl>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Export Attendance
        </Button>
      </Container>
    </div>
  );
};

export default Attendance;

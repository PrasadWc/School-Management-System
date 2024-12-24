import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import clsteacher from "../../assets/clsteacher.jpg";
import axios from "axios";

const chartConfig = {
  type: "bar",
  height: 340,
  series: [
    {
      name: "Marks",
      data: [50, 40, 100],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    xaxis: {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: ["Maths", "Science", "History"],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

const pieChartConfig = {
  type: "donut",
  width: 320,
  height: 320,
  series: [44, 55],
  options: {
    plotOptions: {
      pie: {
        customScale: 1.0,
        donut: {
          labels: {
            show: true,
            name: "Total",
          },
          size: "50%",
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    chart: {
      type: "donut",
    },
    labels: ["Present", "Absent"],
    legend: {
      position: "right",
    },
  },
};

const StudentDashboard = () => {
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [assignmentsCount, setAssignmentsCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Retrieve teacher details from localStorage
    const details = JSON.parse(localStorage.getItem("teacherDetails"));
    setTeacherDetails(details);

    const fetchAssignmentsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/assignments/allAssignments/"
        );
        if (response.status === 200) {
          setAssignmentsCount(response.data.length); // Assuming response.data is an array of assignments
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/teacherannouncements/allteacherAnnouncements/"
        );
        if (response.status === 200) {
          setAnnouncements(response.data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAssignmentsCount();
    fetchAnnouncements();
  }, []);

  if (!teacherDetails) {
    return <div>Loading...</div>; // Show a loading state or null while the data is being fetched
  }

  return (
    <div className="bg-[#e2e8f0] min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-16 py-12 max-w-customwidth">
        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card
                shadow={true}
                className="relative grid h-[16rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
              >
                <CardBody className="grid place-items-center px-2">
                  <Typography variant="h5" color="blue-gray">
                    Attendance Summary
                  </Typography>
                  <div className="mt-2">
                    <Chart {...pieChartConfig} />
                  </div>
                </CardBody>
              </Card>
              <Card
                shadow={true}
                className="relative grid h-[16rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://img.freepik.com/free-vector/stressed-millennial-guy-studying-before-college-exams-distressed-student-meeting-deadline-doing-assignment-preparing-test-home-with-books-flat-illustration_74855-20731.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1717545600&semt=ais_user')] bg-cover bg-center"
                >
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardBody className="relative py-14 px-6 md:px-12">
                  <Typography
                    variant="h2"
                    color="white"
                    className="mb-6 font-medium leading-[1.5]"
                  >
                    Total Assignments Due
                  </Typography>

                  <Typography
                    variant="h4"
                    color="white"
                    className="mb-6 font-medium leading-[1.5]"
                  >
                    {assignmentsCount}
                  </Typography>
                </CardBody>
              </Card>
            </div>

            <Card>
              <div className="flex">
                <div className="w-1/2 p-4">
                  <Typography
                    variant="h5"
                    className="font-semibold text-2xl mb-2"
                  >
                    Class Teacher Details
                  </Typography>
                  <Typography variant="body2" className="text-xl">
                    Name: {teacherDetails.teacherName}
                  </Typography>
                  <Typography className="text-xl" variant="body2">
                    Telephone: {teacherDetails.teacherContactNo}
                  </Typography>
                  <Typography className="text-xl" variant="body2">
                    Email: {teacherDetails.teacherEmail}
                  </Typography>
                </div>
                <div className="w-1/2 flex items-center justify-end">
                  <img
                    src={clsteacher}
                    alt="Class Teacher"
                    className="rounded-full"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 h-[28rem]">
          <Card className="h-[28rem] overflow-auto">
            <CardBody>
              <Typography variant="h6" className="text-xl mb-2">
                Student Performance
              </Typography>
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
          <Card className="h-[28rem] overflow-auto">
            <CardBody>
              <Typography variant="h6" className="text-xl mb-4">
                Announcements and Messages
              </Typography>
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map((announcement, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded">
                      <Typography variant="h6" className="font-semibold">
                        {announcement.announcementCaption}
                      </Typography>
                      <Typography className="mt-2 text-gray-600">
                        {announcement.announcementBody}
                      </Typography>
                      <Typography className="mt-2 text-gray-400 text-sm">
                        {new Date(announcement.date).toLocaleDateString()}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No announcements available.</p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

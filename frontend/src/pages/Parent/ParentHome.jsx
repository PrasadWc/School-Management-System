import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import NavigationBar from "./NavigationBar";
import Chart from "react-apexcharts";
import clsteacher from "../../assets/clsteacher.jpg";
import axios from "axios";

const chartConfig = {
  type: "bar",
  height: 240,
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
      show: "",
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

const ParentDashboard = () => {
  const [classTeacher, setClassTeacher] = useState(null);
  const [adminAnnouncements, setAdminAnnouncements] = useState([]);
  const [teacherAnnouncements, setTeacherAnnouncements] = useState([]); // Add state for teacher announcements

  // Fetch the class teacher details from localStorage
  useEffect(() => {
    const storedTeacherDetails = localStorage.getItem("teacherDetails");
    if (storedTeacherDetails) {
      setClassTeacher(JSON.parse(storedTeacherDetails));
    }
  }, []);

  useEffect(() => {
    // Fetch announcements from admin
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/adminannouncements/allAdminAnnouncements/"
        );
        setAdminAnnouncements(response.data); // Set the fetched announcements
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    // Fetch teacher announcements
    const fetchTeacherAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/teacherannouncements/allteacherAnnouncements/"
        );
        setTeacherAnnouncements(response.data); // Set the fetched teacher announcements
      } catch (error) {
        console.error("Error fetching teacher announcements:", error);
      }
    };

    fetchTeacherAnnouncements();
  }, []);

  return (
    <div className="bg-[#e2e8f0] min-h-screen">
      <NavigationBar />
      <div className="container mx-auto pt-6">
        {/* Class Teacher Details */}
        <Card className="mb-4">
          <div className="flex">
            <div className="w-1/2 p-4">
              <Typography variant="h5" className="font-semibold">
                Class Teacher Details
              </Typography>
              {classTeacher ? (
                <>
                  <Typography variant="body2">
                    Name: {classTeacher.teacherName}
                  </Typography>
                  <Typography variant="body2">
                    Telephone: {classTeacher.teacherContactNo}
                  </Typography>
                  <Typography variant="body2">
                    Email: {classTeacher.teacherEmail}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">Loading...</Typography>
              )}
            </div>
            <div className="w-1/2 flex items-center justify-end">
              <img
                src={clsteacher}
                alt="Class Teacher"
                className="rounded-full w-[250px] h-[150px]"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Performance */}
          <Card className="h-80 overflow-hidden">
            <CardBody>
              <Typography variant="h6" className="text-xl mb-2">
                Student Performance
              </Typography>
              <Chart {...chartConfig} />
            </CardBody>
          </Card>

          {/* Last Week Attendance */}
          <Card className="h-80 overflow-auto">
            <CardBody>
              <Typography variant="h6" className="text-xl mb-4">
                Last Week Attendance
              </Typography>
              <ul className="space-y-5">
                <li className="flex justify-between text-lg">
                  <span>Date: 2023-06-26</span>
                  <span>Present</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span>Date: 2023-06-27</span>
                  <span>Absent</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span>Date: 2023-06-28</span>
                  <span>Present</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span>Date: 2023-06-29</span>
                  <span>Present</span>
                </li>
                <li className="flex justify-between text-lg">
                  <span>Date: 2023-06-30</span>
                  <span>Absent</span>
                </li>
              </ul>
            </CardBody>
          </Card>

          {/* Announcements from School Administration */}
          <Card className="h-[22rem] overflow-auto">
            <CardBody>
              <Typography variant="h6" className="text-xl mb-4">
                Announcements from School Administration
              </Typography>
              <ul className="space-y-4">
                {adminAnnouncements.length > 0 ? (
                  adminAnnouncements
                    .filter(
                      (announcement) => announcement.Audience === "Students"
                    )
                    .map((announcement, index) => (
                      <li key={index} className="border-b pb-4">
                        <Typography variant="h6" className="font-medium">
                          {announcement.announcementCaption}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {announcement.announcementBody}
                        </Typography>
                      </li>
                    ))
                ) : (
                  <li>No announcements available.</li>
                )}
              </ul>
            </CardBody>
          </Card>

          {/* Announcements and Messages from Class Teacher */}
          <Card className="h-[22rem] overflow-auto">
            <CardBody>
              <Typography variant="h6" className="text-xl mb-4">
                Announcements and Messages from Class Teacher
              </Typography>
              <ul className="space-y-4">
                {teacherAnnouncements.length > 0 ? (
                  teacherAnnouncements.map((announcement, index) => (
                    <li key={index} className="border-b pb-4">
                      <Typography variant="h6" className="font-medium">
                        {announcement.announcementCaption}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {announcement.announcementBody}
                      </Typography>
                    </li>
                  ))
                ) : (
                  <li>No teacher announcements available.</li>
                )}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

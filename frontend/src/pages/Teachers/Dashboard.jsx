import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

const TeacherDashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [announcementCaption, setAnnouncementCaption] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");
  const [announcements, setAnnouncements] = useState([]); // State for storing fetched announcements
  const [loading, setLoading] = useState(false);
  const [assignmentsCount, setAssignmentsCount] = useState(0);

  useEffect(() => {
    // Retrieve the class details from local storage
    const classDetails = JSON.parse(localStorage.getItem("classDetails"));

    // If classDetails exist, update the student count
    if (classDetails) {
      setStudentCount(classDetails.studentsCount);
    }

    // Fetch announcements when the component mounts
    fetchAnnouncements();

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

    fetchAssignmentsCount();
  }, []);

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3050/adminannouncements/allAdminAnnouncements/"
      );
      if (response.status === 200) {
        setAnnouncements(response.data); // Store fetched announcements in state
      } else {
        console.error("Failed to fetch announcements.");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Function to handle posting an announcement
  const handlePostAnnouncement = async () => {
    if (!announcementCaption || !announcementBody) {
      alert(
        "Please fill in both the caption and the body of the announcement."
      );
      return;
    }

    setLoading(true);
    const announcementdetails = { announcementCaption, announcementBody };
    try {
      // Make the POST request to the backend
      const response = await axios.post(
        "http://localhost:3050/teacherannouncements/addteacherAnnouncement/",
        announcementdetails
      );

      console.log(announcementdetails);

      if (response.status === 200 || response.status === 201) {
        alert("Announcement posted successfully!");
        // Clear the input fields after successful posting
        setAnnouncementCaption("");
        setAnnouncementBody("");
        // Fetch updated announcements
        fetchAnnouncements();
      } else {
        alert("Failed to post the announcement.");
        console.log("Error response:", response);
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("An error occurred while posting the announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e2e8f0] min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-16 py-12 max-w-customwidth">
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <Card
              shadow={true}
              className="relative grid h-[20rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://img.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg')] bg-cover bg-center"
              >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
              </CardHeader>
              <CardBody className="relative py-14 px-6 md:px-12">
                <Typography
                  variant="h2"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  Total Students of Class
                </Typography>

                <Typography
                  variant="h4"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  {studentCount}
                </Typography>
              </CardBody>
            </Card>
            {/* Other cards can be updated similarly */}
            <Card
              shadow={true}
              className="relative grid h-[20rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://img.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg')] bg-cover bg-center"
              >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
              </CardHeader>
              <CardBody className="relative py-14 px-6 md:px-12">
                <Typography
                  variant="h2"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  Total Students Present Today
                </Typography>

                <Typography
                  variant="h4"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  2
                </Typography>
              </CardBody>
            </Card>
            <Card
              shadow={true}
              className="relative grid h-[20rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://img.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg')] bg-cover bg-center"
              >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
              </CardHeader>
              <CardBody className="relative py-14 px-6 md:px-12">
                <Typography
                  variant="h2"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  Ongoing Assignments
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 h-[28rem]">
          <div className="p-4 bg-[#f3f4f6] shadow rounded">
            <h3 className="text-xl font-semibold">Notices & Announcements</h3>
            {/* Display fetched announcements */}
            <div className="mt-4 space-y-4 h-[20rem] overflow-y-auto">
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <div key={index} className="p-4 bg-white shadow rounded">
                    <h4 className="text-lg font-bold">
                      {announcement.announcementCaption}
                    </h4>
                    <p className="mt-2 text-gray-600">
                      {announcement.announcementBody}
                    </p>
                    <p className="mt-2 text-gray-400 text-sm">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No new notices.</p>
              )}
            </div>
          </div>
          <div className="p-4 bg-[#f3f4f6] shadow rounded">
            <h3 className="text-xl font-semibold">
              Post an Announcement to Students
            </h3>
            <div className="mb-1 flex flex-col gap-6">
              <div className="mt-4">
                <Input
                  label="Announcement Caption"
                  value={announcementCaption}
                  onChange={(e) => setAnnouncementCaption(e.target.value)}
                />
              </div>

              <div className="relative w-full min-w-[200px]">
                <textarea
                  className="peer h-full min-h-[170px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={announcementBody}
                  onChange={(e) => setAnnouncementBody(e.target.value)}
                ></textarea>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[15px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Type Body of Announcement
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                color="blue"
                variant="gradient"
                className="mt-6 rounded-full w-48"
                onClick={handlePostAnnouncement}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Announcement"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

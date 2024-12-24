import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

function PostAssignment() {
  const [caption, setCaption] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [assignments, setAssignments] = useState([]);

  // Fetch assignments on component mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Function to fetch assignments
  const fetchAssignments = () => {
    axios
      .get("http://localhost:3050/assignments/allAssignments/")
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the assignments!", error);
      });
  };

  // Function to handle posting an assignment
  const handlePostAssignment = () => {
    const classDetails = JSON.parse(localStorage.getItem("classDetails"));

    const newAssignment = {
      assignmentCaption: caption,
      Subject: subject,
      assignmentBody: body,
      Class: classDetails.classId,
      postTime: new Date(),
    };

    axios
      .post("http://localhost:3050/assignments/addAssignment/", newAssignment)
      .then((response) => {
        // Fetch assignments again after posting to ensure state is updated
        fetchAssignments();
        // Clear the form inputs
        setCaption("");
        setSubject("");
        setBody("");
      })
      .catch((error) => {
        console.error("There was an error posting the assignment!", error);
      });
  };

  return (
    <div className="bg-[#e2e8f0] min-h-screen">
      <NavigationBar />
      <div className="container mx-auto py-10">
        <div className="grid gap-10">
          {/* Post Assignments Card */}
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">Post Assignments</h2>
              <div className="mb-4">
                <Input
                  type="text"
                  label="Assignment Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Select
                  label="Select Subject"
                  value={subject}
                  onChange={(e) => setSubject(e)}
                >
                  <Option value="Math">Math</Option>
                  <Option value="Science">Science</Option>
                  <Option value="History">History</Option>
                  <Option value="English">English</Option>
                  <Option value="Art">Art</Option>
                </Select>
              </div>
              <div className="mb-4">
                <Textarea
                  label="Assignment Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <Button color="blue" onClick={handlePostAssignment}>
                Post Assignment
              </Button>
            </CardBody>
          </Card>

          {/* Recently Posted Assignments Card */}
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">
                Recently Posted Assignments
              </h2>
              <div className="max-h-96 overflow-y-scroll space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment._id}
                    className="border p-4 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">
                        {assignment.assignmentCaption}
                      </p>
                      <p className="text-sm text-gray-500">
                        Posted on:{" "}
                        {new Date(assignment.postTime).toLocaleString()}
                      </p>
                    </div>
                    <Button color="green" size="sm">
                      Download Submissions
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PostAssignment;

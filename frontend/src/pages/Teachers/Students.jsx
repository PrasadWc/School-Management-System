import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export function ManageClassStudents() {
  const [activeTab, setActiveTab] = useState("details");
  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState(null);

  // Fetch class and student details on component mount
  useEffect(() => {
    const classDetails = JSON.parse(localStorage.getItem("classDetails"));
    setClassId(classDetails.classId);
    fetchClassDetails(classDetails.classId);
  }, []);

  // Function to fetch class details to get the list of student IDs
  const fetchClassDetails = (classId) => {
    axios
      .get("http://localhost:3050/classes/getallclasses")
      .then((response) => {
        const selectedClass = response.data.find(
          (classItem) => classItem._id === classId
        );

        if (selectedClass && selectedClass.students.length > 0) {
          fetchStudentDetailsOneByOne(selectedClass.students);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the class details!", error);
      });
  };

  // Function to fetch student details one by one
  const fetchStudentDetailsOneByOne = (studentIds) => {
    Promise.all(
      studentIds.map((id) =>
        axios.get(`http://localhost:3050/students/getStudent/${id}`)
      )
    )
      .then((responses) => {
        const studentData = responses.map((response) => response.data);
        setStudents(studentData);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the student details!",
          error
        );
      });
  };

  const handleMarksChange = (index, subject, value) => {
    const newStudents = [...students];
    newStudents[index][subject] = value;
    setStudents(newStudents);
  };

  const handleUpdateMarks = (index) => {
    console.log("Updated marks for student:", students[index]);
    // Here, you can add logic to update the marks in your database or state management
  };

  const data = [
    {
      label: "Student Details",
      value: "details",
      icon: UserCircleIcon,
      content: (
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Index No</th>
                <th className="py-2 px-4 border-b">Parent Name</th>
                <th className="py-2 px-4 border-b">Parent Email</th>
                <th className="py-2 px-4 border-b">Complains</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {student.studentName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {student.studentIndexNo}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {student.parentName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {student.parentEmail}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        className="w-full md:w-auto"
                        label="Type your complain"
                      />
                      <Button className="w-full md:w-auto">
                        Post Complain
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      label: "Student Performance Update",
      value: "performance",
      icon: PencilSquareIcon,
      content: (
        <div className="p-4">
          <div className="w-72 mb-4">
            <Select label="Select Term">
              <Option>1st Term</Option>
              <Option>2nd Term</Option>
              <Option>3rd Term</Option>
            </Select>
          </div>
          {students.map((student, index) => (
            <div key={student._id} className="mb-4">
              <h3 className="text-xl mb-2">{student.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                <Input
                  label="History Marks"
                  value={student.historyMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "historyMarks", e.target.value)
                  }
                />
                <Input
                  label="Science Marks"
                  value={student.scienceMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "scienceMarks", e.target.value)
                  }
                />
                <Input
                  label="Math Marks"
                  value={student.mathMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "mathMarks", e.target.value)
                  }
                />
                <Button
                  className="w-full md:w-auto"
                  onClick={() => handleUpdateMarks(index)}
                >
                  Update Marks
                </Button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#e2e8f0] min-h-screen">
      <NavigationBar />

      <div className="container bg-white mx-auto py-10 px-4">
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <TabsHeader>
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default ManageClassStudents;

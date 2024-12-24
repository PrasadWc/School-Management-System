import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3050/assignments/allAssignments/"
        );
        if (response.status === 200) {
          setAssignments(response.data); // Assuming response.data is an array of assignments
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="bg-[#e2e8f0] min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-16 py-12">
        <h1 className="text-3xl font-semibold mb-6">Assignments</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
          <ul className="divide-y divide-gray-200">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <li key={index} className="py-3">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold">
                      {assignment.assignmentCaption}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Subject: {assignment.Subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      {assignment.assignmentBody}
                    </p>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      Submit
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-3 text-center">No assignments available.</li>
            )}
          </ul>
        </div>
        {/* Add more sections or components for assignments as needed */}
      </div>
    </div>
  );
};

export default Assignments;

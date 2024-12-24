import axios from "axios";

const API_BASE_URL = "http://localhost:3050";

export const fetchClasses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes/getallclasses`);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error("Error fetching classes: " + error.message);
  }
};

export const fetchTeachers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/getallteachers`);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error("Error fetching teachers: " + error.message);
  }
};

export const fetchStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/getalldetails`);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error("Error fetching students: " + error.message);
  }
};

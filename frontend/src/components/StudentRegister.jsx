import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Button, Option } from "@material-tailwind/react";
import axios from "axios";

const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
const sections = ["A", "B", "C"];

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      studentName: data.studentName,
      studentIndexNo: data.studentIndexNo,
      className: `${data.className}${data.section}`,
      parentName: data.parentName,
      parentEmail: data.parentEmail,
      password: data.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3050/studentauth/signup/",
        formattedData
      );
      window.alert("Account created successfully!");
      reset();
    } catch (error) {
      window.alert("Error during form submission: " + error.message);
      console.error("Error during form submission", error);
    }
  };

  const onReset = () => {
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="Student Name"
              {...register("studentName", { required: true })}
              error={errors.studentName ? true : false}
              size="lg"
            />
            {errors.studentName && (
              <span className="text-red-500 text-sm">
                Student Name is required
              </span>
            )}
          </div>
          <div>
            <Input
              label="Student Index No"
              {...register("studentIndexNo", { required: true })}
              error={errors.studentIndexNo ? true : false}
              size="lg"
            />
            {errors.studentIndexNo && (
              <span className="text-red-500 text-sm">
                Student Index No is required
              </span>
            )}
          </div>
          <div>
            <Controller
              name="className"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  label="Class Name"
                  {...field}
                  error={errors.className ? true : false}
                  size="lg"
                >
                  {grades.map((grade, index) => (
                    <Option key={index} value={grade}>
                      {grade}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.className && (
              <span className="text-red-500 text-sm">
                Class Name is required
              </span>
            )}
          </div>
          <div>
            <Controller
              name="section"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  label="Section"
                  {...field}
                  error={errors.section ? true : false}
                  size="lg"
                >
                  {sections.map((section, index) => (
                    <Option key={index} value={section}>
                      {section}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.section && (
              <span className="text-red-500 text-sm">Section is required</span>
            )}
          </div>
          <div>
            <Input
              label="Parent Name"
              {...register("parentName", { required: true })}
              error={errors.parentName ? true : false}
              size="lg"
            />
            {errors.parentName && (
              <span className="text-red-500 text-sm">
                Parent Name is required
              </span>
            )}
          </div>
          <div>
            <Input
              label="Parent Email"
              type="email"
              {...register("parentEmail", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              error={errors.parentEmail ? true : false}
              size="lg"
            />
            {errors.parentEmail && (
              <span className="text-red-500 text-sm">
                Valid Parent Email is required
              </span>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              error={errors.password ? true : false}
              size="lg"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <Button type="submit" color="blue" size="lg" className="w-full">
              Sign Up
            </Button>
            <Button
              type="button"
              color="red"
              size="lg"
              className="w-full"
              onClick={onReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;

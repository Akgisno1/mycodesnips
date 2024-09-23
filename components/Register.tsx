"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const req = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (req.ok) {
        router.push("/login");
        console.log("user registered");
      } else {
        console.log("user registeration failed");
      }
    },
  });
  return (
    <form
      className="w-[400px] flex flex-col gap-4 p-4 bg-accent text-accent-foreground shadow-md rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-full justify-center flex -mb-2">
        <h2 className="text-primary text-2xl font-bold ">
          Join to Create Snips
        </h2>
      </div>
      <div className="text-gray-500">Please Provide Your Details</div>
      <div className="flex flex-col relative w-full ">
        <label className="text-md font-semibold">Username</label>
        <input
          id="username"
          name="name"
          type="text"
          className="bg-card w-full p-1 rounded-sm shadow-md"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm absolute -bottom-5">
            {formik.errors.name}
          </div>
        )}
      </div>
      <div className="flex flex-col relative w-full">
        <label className="text-md font-semibold">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="bg-card w-full p-1 rounded-sm shadow-md"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm absolute -bottom-5">
            {formik.errors.email}
          </div>
        )}
      </div>
      <div className="flex flex-col relative w-full">
        <label className="text-md font-semibold">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="bg-card w-full p-1 rounded-sm shadow-md"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.email && (
          <div className="absolute text-red-500 text-sm -bottom-5">
            {formik.errors.password}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="bg-primary text-white text-md font-semibold mt-1"
      >
        Register
      </Button>
      <div className="text-gray-500">
        Already have an account?{"  "}
        <Link href="/login" className="text-violet-600">
          Login here
        </Link>
      </div>
    </form>
  );
};

export default Register;

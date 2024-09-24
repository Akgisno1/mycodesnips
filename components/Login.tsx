"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const req = await fetch("api/auth/signinuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (req.ok) {
        console.log("user logged in");
        router.push("/");
      } else {
        console.log("user log in failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 ">
      <div className="w-full justify-center flex -mb-2">
        <h2 className="text-primary text-2xl font-bold ">Welcome Back</h2>
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
          <div className="text-sm text-red-500 absolute -bottom-5">
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
        {formik.touched.password && formik.errors.password && (
          <div className="text-sm text-red-500 absolute -bottom-5">
            {formik.errors.password}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="bg-primary text-white text-md font-semibold mt-1"
      >
        Login
      </Button>
      <div className="text-gray-500">
        Create your account?{" "}
        <Link href="/register" className="text-primary">
          Register here
        </Link>
      </div>
    </form>
  );
};

export default Login;

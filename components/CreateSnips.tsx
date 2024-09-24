"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const CreateSnips = () => {
  const editorRef = useRef(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(1, "Title is required")
        .max(50, "Must be 50 characters or less")
        .required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      const req = await fetch("/api/snip/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (req.ok) {
        router.push("/");
        console.log("Snip created");
      } else {
        console.log("Snip creation failed");
      }
    },
  });

  return (
    <form
      className="w-full h-full overflow-y-scroll flex flex-col gap-4 p-4 bg-accent text-accent-foreground shadow-md rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-primary text-2xl font-bold">Create Your Code Snip</h2>
      <div className="flex flex-col relative w-full">
        <label className="text-md font-semibold">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="bg-card w-full p-1 rounded-sm shadow-md"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-sm absolute -bottom-5">
            {formik.errors.title}
          </div>
        )}
      </div>

      <div className="flex flex-col relative w-full">
        <label className="text-md font-semibold">
          Code Snippet and Details
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
          onInit={(evt, editor) => {
            // @ts-expect-error: editorRef.current is typed as null initially and needs to be assigned to the editor instance
            editorRef.current = editor;
          }}
          init={{
            height: 350,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "codesample",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
            ],
            toolbar:
              "undo redo | " +
              "codesample | bold italic forecolor | alignleft aligncenter |" +
              "alignright alignjustify | bullist numlist",
            content_style: "body { font-family:Inter; font-size:16px }",
            skin: isDarkMode ? "oxide-dark" : "oxide",
            content_css: isDarkMode ? "dark" : "light",
          }}
          onEditorChange={(content) => {
            formik.setFieldValue("content", content);
          }}
          onBlur={() => {
            formik.setFieldTouched("content", true);
            formik.validateField("content");
          }}
        />
        {formik.touched.content && formik.errors.content && (
          <div className="text-red-500 text-sm absolute -bottom-5">
            {formik.errors.content}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="bg-primary text-white text-md font-semibold mt-1"
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateSnips;

"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import React, { Suspense, useRef } from "react";
import EditorComponent from "../_components/editor/EditorComponent";
import { ForwardRefEditor } from "../_components/editor/Editor";

export default function CreatePage() {
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editorRef.current?.getMarkdown());
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
          <fieldset className="grid grid-cols-4 gap-3 rounded-md bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-xl">New Blog</p>
              <p className="text-xs">Blog post details</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label htmlFor="username" className="text-sm">
                  Post Title
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Post Title"
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Post Description
                </label>
                <textarea
                  id="bio"
                  placeholder="Post Description"
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                ></textarea>
              </div>
              <div className="col-span-full">
                <label htmlFor="website" className="text-sm">
                  Post tags/keywords (max 3)
                </label>
                <input
                  id="website"
                  type="text"
                  placeholder="Post tags/keywords"
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="container mt-2 w-10/12 min-h-96 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
          <Suspense fallback={null}>
            <ForwardRefEditor
              ref={editorRef}
              markdown=""
              placeholder="Your Blog Content here"
            />
          </Suspense>
          <div className="text-center">
            <button
              type="submit"
              className="mt-2 px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

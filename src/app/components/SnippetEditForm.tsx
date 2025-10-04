"use client";
import React, { useState } from "react";
import { Snippet as PrismaSnippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import * as actions from "@/app/actions/index";
// interface برای props
interface SnippetEditFormProps {
  snippet: PrismaSnippet;
}

const SnippetEditForm: React.FC<SnippetEditFormProps> = ({ snippet }) => {
  const [code, setCode] = useState(snippet.code);
  const handlechange = (value: string = "") => {
    setCode(value);
  };

  const EditSnippetAction = actions.UpdateSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <h2>Edit Snippet</h2>
      <p>Title: {snippet.title}</p>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handlechange}
      />
      <form action={EditSnippetAction} className="mt-4 flex ">
        <button
          type="submit"
          className="
          px-5 py-2.5
          bg-blue-300
          hover:bg-blue-700
          text-white
          font-semibold
          rounded-lg
          shadow-md
          transition-all
          duration-200
          hover:shadow-blue-500/30
          active:scale-95
        "
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;

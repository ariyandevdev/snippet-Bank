import { db } from "@/app/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import * as actions from "@/app/actions/index";
interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

const SnippetShowPage = async ({ params }: SnippetShowPageProps) => {
  const { id } = await params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) return notFound();
  const deleteAction = actions.DeleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${id}/edit`}>
            <button className="p-2 border rounded cursor-pointer">Edit</button>
          </Link>
          <form action={deleteAction}>
            {" "}
            <button className="p-2 border rounded cursor-pointer">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetShowPage;

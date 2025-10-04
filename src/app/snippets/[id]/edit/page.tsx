import SnippetEditForm from "@/app/components/SnippetEditForm";
import { db } from "@/app/db";
import React from "react";

interface EditPageProps {
  params: Promise<{ id: string }>; // 👈 حتماً Promise باشه
}

const EditPage = async ({ params }: EditPageProps) => {
  const { id } = await params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
  if (!snippet) return <div>Snippet not found</div>;

  return (
    <div className="">
      <SnippetEditForm snippet={snippet} />
    </div>
  );
};

export default EditPage;

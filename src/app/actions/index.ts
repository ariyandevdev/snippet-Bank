"use server";

import { redirect } from "next/navigation";
import { db } from "../db";

export const UpdateSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
};

export const DeleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: { id },
  });

  redirect(`/`);
};

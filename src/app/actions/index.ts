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

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }
  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be longer",
    };
  }

  await db.snippet.create({
    data: { title, code },
  });

  redirect("/");
}

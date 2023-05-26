import { read } from "@db-crud-todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(_: NextApiRequest, res: NextApiResponse) {
  const All_TODOS = read();
  res.status(200).json({
    todos: All_TODOS,
  });
}

export const todoController = {
  get,
};

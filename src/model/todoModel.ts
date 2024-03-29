import mongoose, { Schema } from "mongoose";

interface TodoInstance {
  _id: String;
  description: String;
  status: Boolean;
}

const TodoModel = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model<TodoInstance>("Todo", TodoModel);

export default Todo;

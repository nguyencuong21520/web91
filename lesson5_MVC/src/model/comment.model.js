import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    owner: String,
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel;

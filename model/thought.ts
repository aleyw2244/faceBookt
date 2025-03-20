
import { Schema, model, Document, Types } from "mongoose";
import React from "./reaction.js"; 

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<IReaction>;
}

interface IReaction {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const thoughtSchema = new Schema<IThought>(
  {
   
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [React], 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
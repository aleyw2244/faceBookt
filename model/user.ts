
import { Schema, model, Document, Types} from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
  }

const userSchema = new Schema<IUser>({

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  thoughts: [
    {
      type: Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

const User = model<IUser>("User", userSchema);

  export default User;
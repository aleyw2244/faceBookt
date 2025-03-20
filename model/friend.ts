import { Schema, model, Document } from 'mongoose';

interface IFriend extends Document {
  userID: string; 
  friendID: string; 
  createdAt: Date;
}

const friendSchema = new Schema<IFriend>({
  userID: { type: String, required: true },
  friendID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Friend = model('Friend', friendSchema);

Friend.create({
  userID: '12345',
  friendID: '67890',
})
  .then(result => console.log('Created new friend document', result))
  .catch(err => console.log(err));

export default Friend;
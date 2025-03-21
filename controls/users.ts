import Thought from '../model/thought.js';
import User from '../model/user.js';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({ message: 'No friend with that ID' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


export const createUser = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body);

    if (!user) {
      res
        .status(404)
        .json({ message: 'Friend added, but found no user with that ID' });
    } else {
      res.json('Friend added successfully :tada:');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;


    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findOneAndDelete({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }


    if (user.thoughts && Array.isArray(user.thoughts) && user.thoughts.length > 0) {
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
    }

    return res.json({ message: 'User and their thoughts have been deleted!' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'Could not update user!' })
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}


export const createFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res
        .status(404)
        .json({ message: 'Friend added, but found no user with that ID' });
    } else {
      res.json('Friend added successfully :tada:');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No friend with that ID' });
    } else {
      res.json({ message: 'Friend deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  getUsers,
  getSingleUsers,
  createUser,
  removeUser,
  updateUser,
  createFriend,
  deleteFriend,
};
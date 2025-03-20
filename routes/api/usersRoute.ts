import { Router } from 'express';
const router = Router();
import {
  getSingleUsers,
  getUsers,
  createFriend,
  createUser,
  deleteFriend,
  updateUser,
  removeUser,
} from '../../controls/users.js';


router.route('/')
  .get(getUsers)   
  .post(createUser); 

router.route('/:userId')
  .get(getSingleUsers)
  .put(updateUser)
  .delete(removeUser);


router.route('/:userId/friends/:friendId')
  .post(createFriend)  
  .delete(deleteFriend); 

export default router;
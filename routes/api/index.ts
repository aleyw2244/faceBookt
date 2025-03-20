import { Router } from 'express';
const router = Router();
import thoughtRoute from './thoughtsRoute.js';
import userRoute from './usersRoute.js';

router.use('/thought', thoughtRoute);
router.use('/user', userRoute);

export default router;
import { Router } from 'express';
const router = Router();
import { getThoughts, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controls/thoughts.js';


router.route('/').get(getThoughts).post(createThought);


router.route('/:thoughtId').put(updateThought).delete(deleteThought);


router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
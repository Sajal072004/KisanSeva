import express from 'express'

import v1routes from './v1/index.js'

const router=express.Router();

router.use('/v1',v1routes);

export default router;

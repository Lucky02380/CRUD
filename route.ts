import express from 'express';
import {index,show,store,update,destroy} from './controller/studentController.ts'

import { showUsers, delUser, singupUser, loginUser } from './controller/userController.ts';

const router = express.Router()

router.get('/', index)
router.get('/show', show)
router.post('/store', store)
router.put('/update', update)
router.delete('/delete', destroy)


router.get('/showUsers', showUsers)
router.delete('/deleteUser', delUser)
router.post('/login', loginUser);
router.post('/signup', singupUser);

export default router


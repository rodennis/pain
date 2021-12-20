import { Router } from 'express'
import * as controllers from '../controllers/requests.js'

const router = Router()

router.get('/sessions', controllers.getSessions)
router.get('/sessions/:id', controllers.getSession)
router.post('/sessions', controllers.createSession)
router.put('/sessions/:id', controllers.updateSession)
router.delete('/sessions/:id', controllers.deleteSession)

export default router
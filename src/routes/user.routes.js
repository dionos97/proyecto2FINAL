import { Router } from 'express'
import { admin, newAccount, update, remove } from '../controller/user.controller.js'
import { permission } from '../permissions/permission.js'

const router = Router()
// para tener acceso Body - JSON y luego escribir "id": 1 admin 2 usuario
router.get('/admin', permission, admin)
router.post('/newAccount', newAccount)
router.put('/update/:id', update)
router.delete('/delete/:id', remove)

export default router
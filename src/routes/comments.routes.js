import { Router } from 'express'
import { crearComment, updateComment, deleteComment, getCommentsForPost } from '../controller/comments.controller.js'

const router = Router()
// para  crear el Comment en la publicacion  "usuario_id": 2, "publicacion_id": 4, "Comment": "que fue", "fecha_creacion": "2024-04-27 08:35:05"
router.post('/post/Comment', crearComment)
// para actualizar es  "Comment": "", "fecha_creacion": "0000-00-00 00:00:00"
router.put('/Comment/:id', updateComment)
// para eleminar el Comment
router.delete('/Comment/:id', deleteComment)
// Los Comments solo serán visibles a través de la publicación a la que pertenecen.
router.get('/post/:id/Comments', getCommentsForPost)
export default router
import express from 'express'
import { getPost, filterCategory, filterTitle, createPublication, updatePublication, deletePublication } from '../controller/post.controller.js'

const router = express.Router()
// obtener Post
router.get('/Post', getPost)
// obtener filtrar  por category
router.get('/Post/category/:categoryId', filterCategory)
// obtener  filtrar por titulo
router.get('/Post/title/:name', filterTitle)
// ruta para crear Post
router.post('/Post', createPublication)
// ruta para actualizar Post
router.put('/Post/:id', updatePublication)
// ruta para borror Post
router.delete('/Post/:id', deletePublication)

export default router
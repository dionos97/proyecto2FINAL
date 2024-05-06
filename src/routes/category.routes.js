import { Router } from 'express'
import { indexCategory, createCategory, updateCategory, deleteCategory, getPublicationsByCategory } from '../controller/category.controller.js'
import { permission } from '../permissions/permission.js'

const router = Router()
// Codigo para ver las category hacer el llamado para tener acceso con eje: id: 1, es admin
router.get('/category', permission, indexCategory)
// Codigo para crear category hacer el llamado para tener acceso con eje: id: 1, es admin + nombre:
router.post('/category/create', permission, createCategory)
// Codigo para Actualizar las category, hacer el llamado id: 1, es admin + nombre:
router.put('/category/update/:id', permission, updateCategory)
// Codigo para Eliminar las category, hacer el llamado para tener acceso con id: 1, es admin
router.delete('/category/:id', permission, deleteCategory)
// Codigo para Eliminar las post por category
router.get('/post/category/:id', permission, getPublicationsByCategory)

export default router
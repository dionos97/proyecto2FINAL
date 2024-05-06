import { pool } from '../config/db.js'
import { permission } from '../permissions/permission.js'

export const indexCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const [post_categories] = await pool.query('SELECT * FROM post_categories')
      res.json(post_categories)
    })
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const createCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const { nombre } = req.body
      const query = 'INSERT INTO post_categories (nombre) VALUES (?)'
      const [result] = await pool.query(query, [nombre])
      res.status(201).json({ id: result.insertId, nombre })
    })
  } catch (error) {
    console.error('Error al crear categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const updateCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const { id } = req.params
      const { nombre } = req.body
      const query = 'UPDATE post_categories SET nombre = ? WHERE id = ?'
      await pool.query(query, [nombre, id])
      res.json({ message: 'Categoría actualizada correctamente' })
    })
  } catch (error) {
    console.error('Error al actualizar categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    await permission(req, res, async () => {
      const { id } = req.params
      const query = 'DELETE FROM post_categories WHERE id = ?'
      await pool.query(query, [id])
      res.json({ message: 'Categoría eliminada correctamente' })
    })
  } catch (error) {
    console.error('Error al eliminar categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getPublicationsByCategory = async (req, res) => {
  try {
    // Aplica el middleware `permission` antes de ejecutar la lógica de la ruta
    await permission(req, res, async () => {
      // Extrae el ID de la categoría de los parámetros de la solicitud
      const { category_id: categoryId } = req.params

      // Verifica si se proporcionó un ID de categoría válido
      if (!categoryId || isNaN(categoryId)) {
        return res.status(400).json({ message: 'ID de categoría no válido' })
      }

      // Consulta SQL para obtener las post asociadas a la categoría específica
      const [post] = await pool.execute(`
        SELECT p.id, p.titulo, p.contenido, GROUP_CONCAT(c.nombre) AS post_categories
        FROM post p
        LEFT JOIN post_post_categories pc ON p.id = pc.publicacion_id
        LEFT JOIN post_categories c ON pc.category_id = c.id
        WHERE c.id = ?
        GROUP BY p.id, p.titulo, p.contenido;
      `, [categoryId])

      // Verificar si no se encontraron post para la categoría especificada
      if (post.length === 0) {
        return res.status(404).json({ message: 'No se encontraron post para esta categoría' })
      }

      // Devuelve las post encontradas
      res.json(post)
    })
  } catch (error) {
    console.error('Error al obtener post por categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
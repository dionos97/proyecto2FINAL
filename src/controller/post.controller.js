import { pool } from '../config/db.js'

// Obtener Post
export const getPost = async (req, res) => {
  try {
    const sql = 'SELECT p.*, user_id FROM Post p INNER JOIN users u ON p.user_id = u.id;'
    const [Post] = await pool.query(sql)
    res.json(Post)
  } catch (error) {
    res.status(500).json({ massage: 'Hubo un error interno', details: error.massage })
  }
}
// Post por categoría
export const filterCategory = async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId 
    const [results] = await pool.query(query, [categoriaId]) 

    res.json(results) 
  } catch (error) {
    console.error('Error al filtrar Post por categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
// Filtrar Post por titulo
export const filterTitle = async (req, res) => {
  try {
    const title = req.params.name // Corregir el nombre del parámetro
    const query = 'SELECT * FROM Post p INNER JOIN Post_categorias pc ON p.id = pc.Post_id INNER JOIN categorias c ON c.id = pc.categoria_id WHERE p.titulo = ?'
    console.log(title)
    const [results] = await pool.execute(query, [title])
    console.log(results)
    if (results.length === 0) { // Verificar si no se encontraron resultados
      return res.status(404).json({ message: 'No se encontraron Post con el título proporcionado' })
    }

    res.json(results)
  } catch (error) {
    console.error('Error al filtrar Post por título:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
// crear Post
export const createPublication = async (req, res) => {
  try {
    const { user_id: userId, titulo, contenido, fecha_creacion: fechaCreacion } = req.body

    if (!userId || !titulo || !contenido || !fechaCreacion) {
      return res.status(400).json({ message: 'Datos faltant' })
    }

    await pool.execute('INSERT INTO Post(user_id, titulo, contenido, fecha_creacion) VALUES (?, ?, ?, ?)', [userId, titulo, contenido, fechaCreacion])
    res.status(201).json({ message: 'Publicación creada' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno', details: error.message })
  }
}
// actualizar Post
export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, contenido, fecha_creacion: fechaCreacion } = req.body

    if (!id) return res.status(400).json({ message: 'No se reconoce la publicación' })
    if (!titulo || !contenido || !fechaCreacion) {
      return res.status(400).json({ message: 'Datos faltant' })
    }

    await pool.execute('UPDATE Post SET titulo = ?, contenido = ?, fecha_creacion = ? WHERE Post.id = ?', [titulo, contenido, fechaCreacion, id])
    res.status(200).json({ message: 'Publicación actualizada' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno', details: error.message })
  }
}
// borrar Post
export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params
    await pool.execute('DELETE FROM Post WHERE id = ?', [id])
    res.json({ message: 'Publicación eliminada' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno' })
  }
}
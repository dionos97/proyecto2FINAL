import { pool } from '../config/db.js'

export const crearComment = async (req, res) => {
  try {
    const { user_id: userId, publicacion_id: publicacionId, Coments, fecha_creacion: fechaCreacion } = req.body

    if (!userId || !publicacionId || !Coments || !fechaCreacion) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('INSERT INTO Coments(user_id, publicacion_id, Coments, fecha_creacion) VALUES (?, ?, ?, ?)', [userId, publicacionId, Coments, fechaCreacion])
    res.status(201).json({ message: 'Coments creado' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno', details: error.message })
  }
}
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { Coments, fecha_creacion: fechaCreacion } = req.body

    if (!id) return res.status(400).json({ message: 'No se reconoce la publicación' })
    if (!Coments || !fechaCreacion) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('UPDATE Coments SET Coments = ?, fecha_creacion = ? WHERE Coments.id = ?', [Coments, fechaCreacion, id])
    res.status(200).json({ message: 'Coments actualizado' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno', details: error.message })
  }
}
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    await pool.execute('DELETE FROM Coments WHERE id = ?', [id])
    res.json({ message: 'Coments eliminada' })
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno' })
  }
}
export const getCommentsForPost = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si se proporcionó un ID de publicación válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID de publicación no válido' })
    }

    // Consulta SQL para obtener los Coments asociados a la publicación específica
    const [Coments] = await pool.query(
      'SELECT * FROM Coments WHERE publicacion_id = ?',
      [id]
    )

    // Verificar si se encontraron Coments para la publicación especificada
    if (Coments.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Coments para esta publicación' })
    }

    res.json(Coments)
  } catch (error) {
    console.error('Error al obtener Coments para la publicación:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
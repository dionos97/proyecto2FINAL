export const permission = async (req, res, next) => {
    try {
      const { id } = req.body
  
      // Verificar si el ID proporcionado es 1
      if (id !== 1) {
        return res.status(403).json({ message: 'No permitido no es el administrador' })
      }
  
      // Si el ID es 1, continuar con la creación de la categoría
      next()
    } catch (error) {
      console.error('Error al verificar permisos:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
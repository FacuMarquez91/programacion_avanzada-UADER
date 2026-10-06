import pool from '../db.js'

export const obtenerTareas = async (req, res) => {

  try {

    const resultado = await pool.query(`
      SELECT
        id,
        nombre_proyecto AS "nombreProyecto",
        tipo_actividad AS "tipoActividad",
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        persona_asignada AS "personaAsignada",
        precondicion,
        fecha_creacion AS "fechaCreacion",
        fecha_cierre AS "fechaCierre",
        sprint
      FROM tareas
      ORDER BY id DESC
    `)

    res.json(resultado.rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al obtener las tareas'
    })
  }
}


export const obtenerTareaPorId = async (req, res) => {

  try {

    const { id } = req.params

    const resultado = await pool.query(`
      SELECT
        id,
        nombre_proyecto AS "nombreProyecto",
        tipo_actividad AS "tipoActividad",
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        persona_asignada AS "personaAsignada",
        precondicion,
        fecha_creacion AS "fechaCreacion",
        fecha_cierre AS "fechaCierre",
        sprint
      FROM tareas
      WHERE id = $1
    `, [id])

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      })
    }

    res.json(resultado.rows[0])

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al obtener la tarea'
    })
  }
}


export const crearTarea = async (req, res) => {

  try {

    const {
      nombreProyecto,
      tipoActividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      personaAsignada,
      precondicion,
      fechaCreacion,
      fechaCierre,
      sprint
    } = req.body

    if (
      !nombreProyecto ||
      !tipoActividad ||
      !estado ||
      !resumen ||
      !descripcion ||
      !prioridad ||
      !informador ||
      !personaAsignada ||
      !fechaCreacion ||
      !sprint
    ) {

      return res.status(400).json({
        mensaje: 'Faltan campos obligatorios'
      })
    }

    const resultado = await pool.query(`
      INSERT INTO tareas (
        nombre_proyecto,
        tipo_actividad,
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        persona_asignada,
        precondicion,
        fecha_creacion,
        fecha_cierre,
        sprint
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12
      )
      RETURNING *
    `, [
      nombreProyecto,
      tipoActividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      personaAsignada,
      precondicion || null,
      fechaCreacion,
      fechaCierre || null,
      sprint
    ])

    res.status(201).json({
      mensaje: 'Tarea creada correctamente',
      tarea: resultado.rows[0]
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al crear la tarea'
    })
  }
}


export const actualizarTarea = async (req, res) => {

  try {

    const { id } = req.params

    const {
      nombreProyecto,
      tipoActividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      personaAsignada,
      precondicion,
      fechaCreacion,
      fechaCierre,
      sprint
    } = req.body

    const resultado = await pool.query(`
      UPDATE tareas
      SET
        nombre_proyecto = $1,
        tipo_actividad = $2,
        estado = $3,
        resumen = $4,
        descripcion = $5,
        prioridad = $6,
        informador = $7,
        persona_asignada = $8,
        precondicion = $9,
        fecha_creacion = $10,
        fecha_cierre = $11,
        sprint = $12
      WHERE id = $13
      RETURNING *
    `, [
      nombreProyecto,
      tipoActividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      personaAsignada,
      precondicion || null,
      fechaCreacion,
      fechaCierre || null,
      sprint,
      id
    ])

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      })
    }

    res.json({
      mensaje: 'Tarea actualizada correctamente',
      tarea: resultado.rows[0]
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al actualizar la tarea'
    })
  }
}


export const eliminarTarea = async (req, res) => {

  try {

    const { id } = req.params

    const resultado = await pool.query(
      'DELETE FROM tareas WHERE id = $1 RETURNING id',
      [id]
    )

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      })
    }

    res.json({
      mensaje: 'Tarea eliminada correctamente'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al eliminar la tarea'
    })
  }
}


export const finalizarTarea = async (req, res) => {

  try {

    const { id } = req.params

    const resultado = await pool.query(`
      UPDATE tareas
      SET
        estado = 'Finalizada',
        fecha_cierre = COALESCE(fecha_cierre, CURRENT_DATE)
      WHERE id = $1
      RETURNING *
    `, [id])

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        mensaje: 'Tarea no encontrada'
      })
    }

    res.json({
      mensaje: 'Tarea finalizada correctamente',
      tarea: resultado.rows[0]
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al finalizar la tarea'
    })
  }
}
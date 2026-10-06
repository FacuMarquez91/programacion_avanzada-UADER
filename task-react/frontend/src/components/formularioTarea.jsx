import { useEffect, useState } from 'react'

const tareaInicial = {
  nombreProyecto: '',
  tipoActividad: '',
  estado: 'Pendiente',
  resumen: '',
  descripcion: '',
  prioridad: 'Media',
  informador: '',
  personaAsignada: '',
  precondicion: '',
  fechaCreacion: '',
  fechaCierre: '',
  sprint: ''
}

function FormularioTarea({
  agregarTarea,
  actualizarTarea,
  tareaEditar,
  cancelarEdicion
}) {

  const [tarea, setTarea] = useState(tareaInicial)

  useEffect(() => {

    if (tareaEditar) {

      setTarea({
        nombreProyecto: tareaEditar.nombreProyecto || '',
        tipoActividad: tareaEditar.tipoActividad || '',
        estado: tareaEditar.estado || 'Pendiente',
        resumen: tareaEditar.resumen || '',
        descripcion: tareaEditar.descripcion || '',
        prioridad: tareaEditar.prioridad || 'Media',
        informador: tareaEditar.informador || '',
        personaAsignada: tareaEditar.personaAsignada || '',
        precondicion: tareaEditar.precondicion || '',
        fechaCreacion: tareaEditar.fechaCreacion
          ? tareaEditar.fechaCreacion.substring(0, 10)
          : '',
        fechaCierre: tareaEditar.fechaCierre
          ? tareaEditar.fechaCierre.substring(0, 10)
          : '',
        sprint: tareaEditar.sprint || ''
      })

    } else {

      setTarea(tareaInicial)

    }

  }, [tareaEditar])

  const manejarCambio = (evento) => {

    const { name, value } = evento.target

    setTarea({
      ...tarea,
      [name]: value
    })
  }

  const manejarEnvio = async (evento) => {

    evento.preventDefault()

    let correcto = false

    if (tareaEditar) {

      correcto = await actualizarTarea(
        tareaEditar.id,
        tarea
      )

    } else {

      correcto = await agregarTarea(tarea)

    }

    if (correcto) {
      setTarea(tareaInicial)
    }
  }

  const manejarCancelar = () => {
    setTarea(tareaInicial)
    cancelarEdicion()
  }

  return (
    <section className="seccion-formulario">

      <h2>
        {tareaEditar ? 'Editar Tarea' : 'Nueva Tarea'}
      </h2>

      <form onSubmit={manejarEnvio}>

        <div className="form-grid">

          <div className="campo">
            <label>Nombre del Proyecto</label>

            <input
              type="text"
              name="nombreProyecto"
              value={tarea.nombreProyecto}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo">
            <label>Tipo de Actividad</label>

            <select
              name="tipoActividad"
              value={tarea.tipoActividad}
              onChange={manejarCambio}
              required
            >
              <option value="">Seleccione una actividad</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Análisis">Análisis</option>
              <option value="Diseño">Diseño</option>
              <option value="Testing">Testing</option>
              <option value="Documentación">Documentación</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <div className="campo">
            <label>Estado</label>

            <select
              name="estado"
              value={tarea.estado}
              onChange={manejarCambio}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>

          <div className="campo">
            <label>Prioridad</label>

            <select
              name="prioridad"
              value={tarea.prioridad}
              onChange={manejarCambio}
              required
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="campo campo-ancho">
            <label>Resumen</label>

            <input
              type="text"
              name="resumen"
              value={tarea.resumen}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo campo-ancho">
            <label>Descripción</label>

            <textarea
              name="descripcion"
              value={tarea.descripcion}
              onChange={manejarCambio}
              rows="4"
              required
            />
          </div>

          <div className="campo">
            <label>Informador</label>

            <input
              type="text"
              name="informador"
              value={tarea.informador}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo">
            <label>Persona Asignada</label>

            <input
              type="text"
              name="personaAsignada"
              value={tarea.personaAsignada}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo campo-ancho">
            <label>Precondición</label>

            <textarea
              name="precondicion"
              value={tarea.precondicion}
              onChange={manejarCambio}
              rows="2"
            />
          </div>

          <div className="campo">
            <label>Fecha de Creación</label>

            <input
              type="date"
              name="fechaCreacion"
              value={tarea.fechaCreacion}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo">
            <label>Fecha de Cierre</label>

            <input
              type="date"
              name="fechaCierre"
              value={tarea.fechaCierre}
              onChange={manejarCambio}
            />
          </div>

          <div className="campo">
            <label>Sprint</label>

            <input
              type="text"
              name="sprint"
              value={tarea.sprint}
              onChange={manejarCambio}
              placeholder="Ej: Sprint 1"
              required
            />
          </div>

        </div>

        <div className="acciones-formulario">

          <button
            type="submit"
            className="boton boton-guardar"
          >
            {tareaEditar
              ? 'Guardar Cambios'
              : 'Crear Tarea'}
          </button>

          {tareaEditar && (

            <button
              type="button"
              className="boton boton-cancelar"
              onClick={manejarCancelar}
            >
              Cancelar
            </button>

          )}

        </div>

      </form>

    </section>
  )
}

export default FormularioTarea
function Tarea({
  tarea,
  editarTarea,
  eliminarTarea,
  finalizarTarea
}) {

  const formatearFecha = (fecha) => {

    if (!fecha) {
      return 'Sin definir'
    }

    const fechaTexto = fecha.substring(0, 10)
    const [anio, mes, dia] = fechaTexto.split('-')

    return `${dia}/${mes}/${anio}`
  }

  const claseEstado = tarea.estado
    .toLowerCase()
    .replace(' ', '-')

  const clasePrioridad = tarea.prioridad.toLowerCase()

  return (
    <article className="tarjeta-tarea">

      <div className="cabecera-tarea">

        <div>
          <h3>{tarea.resumen}</h3>
          <p className="proyecto">
            {tarea.nombreProyecto}
          </p>
        </div>

        <div className="etiquetas">

          <span className={`estado ${claseEstado}`}>
            {tarea.estado}
          </span>

          <span className={`prioridad ${clasePrioridad}`}>
            {tarea.prioridad}
          </span>

        </div>

      </div>

      <div className="contenido-tarea">

        <p>
          <strong>Tipo de Actividad:</strong>{' '}
          {tarea.tipoActividad}
        </p>

        <p>
          <strong>Descripción:</strong>{' '}
          {tarea.descripcion}
        </p>

        <p>
          <strong>Informador:</strong>{' '}
          {tarea.informador}
        </p>

        <p>
          <strong>Persona Asignada:</strong>{' '}
          {tarea.personaAsignada}
        </p>

        <p>
          <strong>Precondición:</strong>{' '}
          {tarea.precondicion || 'Sin precondición'}
        </p>

        <p>
          <strong>Fecha de Creación:</strong>{' '}
          {formatearFecha(tarea.fechaCreacion)}
        </p>

        <p>
          <strong>Fecha de Cierre:</strong>{' '}
          {formatearFecha(tarea.fechaCierre)}
        </p>

        <p>
          <strong>Sprint:</strong>{' '}
          {tarea.sprint}
        </p>

      </div>

      <div className="acciones-tarea">

        <button
          className="boton boton-editar"
          onClick={() => editarTarea(tarea)}
        >
          Editar
        </button>

        {tarea.estado !== 'Finalizada' && (

          <button
            className="boton boton-finalizar"
            onClick={() => finalizarTarea(tarea.id)}
          >
            Finalizar
          </button>

        )}

        <button
          className="boton boton-eliminar"
          onClick={() => eliminarTarea(tarea.id)}
        >
          Eliminar
        </button>

      </div>

    </article>
  )
}

export default Tarea
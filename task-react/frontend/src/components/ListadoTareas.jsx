import Tarea from './Tarea'

function ListadoTareas({
  tareas,
  editarTarea,
  eliminarTarea,
  finalizarTarea
}) {

  return (
    <section className="seccion-listado">

      <div className="titulo-listado">

        <h2>Listado de Tareas</h2>

        <span>
          Total: {tareas.length}
        </span>

      </div>

      {tareas.length === 0 ? (

        <div className="sin-tareas">
          <p>No hay tareas registradas.</p>
        </div>

      ) : (

        <div className="lista-tareas">

          {tareas.map((tarea) => (

            <Tarea
              key={tarea.id}
              tarea={tarea}
              editarTarea={editarTarea}
              eliminarTarea={eliminarTarea}
              finalizarTarea={finalizarTarea}
            />

          ))}

        </div>

      )}

    </section>
  )
}

export default ListadoTareas
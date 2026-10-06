import { useEffect, useState } from 'react'
import FormularioTarea from './components/formularioTarea'
import ListadoTareas from './components/ListadoTareas'
import './App.css'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/tareas'

function App() {

  const [tareas, setTareas] = useState([])
  const [tareaEditar, setTareaEditar] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const obtenerTareas = async () => {
    try {

      setError('')

      const respuesta = await fetch(API_URL)

      if (!respuesta.ok) {
        throw new Error('No se pudieron obtener las tareas')
      }

      const datos = await respuesta.json()

      setTareas(datos)

    } catch (error) {

      console.error(error)
      setError('No se pudieron cargar las tareas.')

    } finally {

      setCargando(false)

    }
  }

  useEffect(() => {
    obtenerTareas()
  }, [])

  const agregarTarea = async (tarea) => {

    try {

      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
      })

      if (!respuesta.ok) {
        const datosError = await respuesta.json()
        throw new Error(datosError.mensaje || 'Error al crear la tarea')
      }

      await obtenerTareas()

      return true

    } catch (error) {

      console.error(error)
      alert(error.message)

      return false
    }
  }

  const actualizarTarea = async (id, tarea) => {

    try {

      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
      })

      if (!respuesta.ok) {
        const datosError = await respuesta.json()
        throw new Error(datosError.mensaje || 'Error al actualizar la tarea')
      }

      setTareaEditar(null)

      await obtenerTareas()

      return true

    } catch (error) {

      console.error(error)
      alert(error.message)

      return false
    }
  }

  const eliminarTarea = async (id) => {

    const confirmar = window.confirm(
      '¿Está seguro de que desea eliminar esta tarea?'
    )

    if (!confirmar) {
      return
    }

    try {

      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la tarea')
      }

      if (tareaEditar?.id === id) {
        setTareaEditar(null)
      }

      await obtenerTareas()

    } catch (error) {

      console.error(error)
      alert('No se pudo eliminar la tarea.')

    }
  }

  const finalizarTarea = async (id) => {

    try {

      const respuesta = await fetch(`${API_URL}/${id}/finalizar`, {
        method: 'PATCH'
      })

      if (!respuesta.ok) {
        throw new Error('Error al finalizar la tarea')
      }

      if (tareaEditar?.id === id) {
        setTareaEditar(null)
      }

      await obtenerTareas()

    } catch (error) {

      console.error(error)
      alert('No se pudo finalizar la tarea.')

    }
  }

  return (
    <main className="contenedor">

      <header className="encabezado">
        <h1>Gestor de Tareas</h1>
        <p>Administración de tareas de proyectos de software</p>
      </header>

      {error && (
        <div className="mensaje-error">
          {error}
        </div>
      )}

      <FormularioTarea
        agregarTarea={agregarTarea}
        actualizarTarea={actualizarTarea}
        tareaEditar={tareaEditar}
        cancelarEdicion={() => setTareaEditar(null)}
      />

      {cargando ? (
        <p className="cargando">Cargando tareas...</p>
      ) : (
        <ListadoTareas
          tareas={tareas}
          editarTarea={setTareaEditar}
          eliminarTarea={eliminarTarea}
          finalizarTarea={finalizarTarea}
        />
      )}

    </main>
  )
}

export default App
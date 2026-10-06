import { Router } from 'express'

import {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  finalizarTarea
} from '../controllers/tareas.controller.js'

const router = Router()

router.get('/', obtenerTareas)

router.get('/:id', obtenerTareaPorId)

router.post('/', crearTarea)

router.put('/:id', actualizarTarea)

router.delete('/:id', eliminarTarea)

router.patch('/:id/finalizar', finalizarTarea)

export default router
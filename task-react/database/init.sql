CREATE TABLE IF NOT EXISTS tareas (

    id SERIAL PRIMARY KEY,

    nombre_proyecto VARCHAR(150) NOT NULL,

    tipo_actividad VARCHAR(100) NOT NULL,

    estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente',

    resumen VARCHAR(255) NOT NULL,

    descripcion TEXT NOT NULL,

    prioridad VARCHAR(50) NOT NULL DEFAULT 'Media',

    informador VARCHAR(150) NOT NULL,

    persona_asignada VARCHAR(150) NOT NULL,

    precondicion TEXT,

    fecha_creacion DATE NOT NULL,

    fecha_cierre DATE,

    sprint VARCHAR(100) NOT NULL,

    CONSTRAINT chk_estado
        CHECK (
            estado IN (
                'Pendiente',
                'En progreso',
                'Finalizada'
            )
        ),

    CONSTRAINT chk_prioridad
        CHECK (
            prioridad IN (
                'Baja',
                'Media',
                'Alta'
            )
        )

);
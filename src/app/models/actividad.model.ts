export interface ActividadModel {
    id?: number;
    mensaje: string;
    estado: string;
}

export const EmptyActividadModel = () => {
    const actividad: ActividadModel = {
        mensaje: '',
        estado: 'TODO'
    }
    return actividad;
}
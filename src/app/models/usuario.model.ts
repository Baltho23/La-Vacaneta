export interface UsuarioModel {
    id?: number;
    name: string;
    username: string;
    password?: string;
    role: string;
    team: string;
    status: string;
    age: number | string;
    avatar: string;
    email: string;
}

export const EmptyUsuarioModel = (): UsuarioModel => {
    const data: UsuarioModel = {
        name: '', username: '', password: '',
        role: '', team: '', status: 'activo',
        age: '', avatar: '', email: ''
    }
    return data;
}
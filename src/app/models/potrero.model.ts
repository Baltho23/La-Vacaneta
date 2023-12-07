export interface PotreroModel {
    id?: number;
    name: string;
    quality: string;
    level: string;
    wear: string;
    picture: string;
    hectares: string;
    Start: string;
    end: string;
}

export const EmptyPotreroModel = () => {
    const articulo: PotreroModel = {
        name: '', 
        quality: '',
        level: '',
        wear: '',
        picture: '',
        hectares: '',
        Start: '',
        end: ''
    }
    return articulo;
}
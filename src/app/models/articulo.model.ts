export interface ArticuloModel {
    id?: number;
    name: string;
    amount: string;
    expiration: string;
    category: string;
    picture: string;
    supplier: string;
}

export const EmptyArticuloModel = () => {
    const articulo: ArticuloModel = {
        name: '', 
        amount: '',
        expiration: '',
        category: '',
        picture: '',
        supplier: ''
    }
    return articulo;
}
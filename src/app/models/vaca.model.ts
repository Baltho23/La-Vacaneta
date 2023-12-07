import { ListSelectItem } from "./selectItem.model";

export default interface Vaca {
    id: string;
    raza: string;
    peso: string;
    edad: string;
    sexo?: ListSelectItem;
}
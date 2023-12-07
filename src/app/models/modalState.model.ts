export interface ModalInfo {
    modalState: ModalState;
    onOpenChange: any;
    onSubmit: Function;
}

export interface ModalState {
    isOpen: boolean;
    data: any;
}

export const InitialModalState = () => {
    return {
        isOpen: false,
        data: {}
    };
}
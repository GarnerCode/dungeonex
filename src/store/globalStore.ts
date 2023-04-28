import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
    id: 'GlobalStore',
    state: () => ({
        userData: null,
        modalToggled: false,
        activeModalType: '',
    }),
    getters: {
        getUserData: (state): any => {
            return state.userData;
        },
        getModalToggled: (state): boolean => {
            return state.modalToggled;
        },
        getActiveModalType: (state): string => {
            return state.activeModalType;
        },
    },
    actions: {
        setUserData(payload: any): void {
            this.userData = payload;
        },
        openModal(toggle: boolean, modalType: string): void {
            this.activeModalType = modalType;
            this.modalToggled = toggle;
        },
        closeModal(): void {
            this.activeModalType = '';
            this.modalToggled = false;
        },
    }
})
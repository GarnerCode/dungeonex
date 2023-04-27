import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
    id: 'GlobalStore',
    state: () => ({
        modalToggled: false,
    }),
    getters: {
        getModalToggled: (state): boolean => {
            return state.modalToggled;
        },
    },
    actions: {
        setModalToggled(toggle: boolean): void {
            this.modalToggled = toggle;
        },
    }
})
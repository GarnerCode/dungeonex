import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useGlobalStore = defineStore({
    id: 'GlobalStore',
    state: () => ({
        userData: null,
        modalToggled: false,
        activeModalType: '',
        campaigns: null as any,
        loadingCampaigns: true,
        characters: null as any,
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
        getCampaigns: (state): any => {
            return state.campaigns;
        },
        getLoadingCampaigns: (state): boolean => {
            return state.loadingCampaigns;
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
        async fetchCampaigns(): Promise<void> {
            const { data, error } = await supabase
            .from('campaigns')
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.campaigns = data;
                this.loadingCampaigns = false;
                console.log('data: ', data);
            }
        }
    }
})
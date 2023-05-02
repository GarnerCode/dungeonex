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

        targetSession: null as any,
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
        getTargetSession: (state): any => {
            return state.targetSession;
        },
    },
    actions: {
        setUserData(payload: any): void {
            this.userData = payload;
        },
        openModal(modalType: string): void {
            this.activeModalType = modalType;
            this.modalToggled = true;
        },
        closeModal(): void {
            this.activeModalType = '';
            this.modalToggled = false;
        },
        getCampaignById(id: number | string | string[]): any {
            return this.getCampaigns.find((campaign: any) => {
                return campaign.id == id;
            });
        },
        setTargetSession(payload: any): void {
            this.targetSession = payload;
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
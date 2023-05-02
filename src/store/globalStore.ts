import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';
import { Campaign, Session } from '@/interfaces/Campaign.interface';
import { Character } from '@/interfaces/Character.interface';

export const useGlobalStore = defineStore({
    id: 'GlobalStore',
    state: () => ({
        userData: null,
        modalToggled: false,
        activeModalType: '',
        campaigns: [] as Campaign[] | any,
        characters: [] as Character[] | any,
        loadingCampaigns: true,
        loadingCharacters: true,

        targetSession: {} as Session,
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
        getCampaigns: (state): Campaign[] => {
            return state.campaigns;
        },
        getCharacters: (state): Character[] => {
            return state.characters;
        },
        getLoadingCampaigns: (state): boolean => {
            return state.loadingCampaigns;
        },
        getLoadingCharacters: (state): boolean => {
            return state.loadingCharacters;
        },
        getTargetSession: (state): Session => {
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
        setTargetSession(payload: Session): void {
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
            }
        },
        async fetchCharacters(): Promise<void> {
            const { data, error } = await supabase
            .from('characters')
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.characters = data;
                this.loadingCharacters = false;
            }
        }
    }
})
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';
import { Campaign, Session } from '@/interfaces/Campaign.interface';
import { Character } from '@/interfaces/Character.interface';
import { InitiativeItem } from '@/interfaces/InitiativeItem.interface';
import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';

export const useGlobalStore = defineStore({
    id: 'GlobalStore',
    state: () => ({
        userData: null,
        modalToggled: false,
        activeModalType: '',
        campaigns: [] as Campaign[] | any,
        characters: [] as Character[] | any,
        initiative: [] as InitiativeItem | any,
        loadingCampaigns: true,
        loadingCharacters: true,
        loadingInitiative: true,

        targetSession: {} as Session,
        targetInitiativeId: 0 as number,
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
        getInitiative: (state): InitiativeItem[] => {
            return state.initiative;
        },
        getLoadingCampaigns: (state): boolean => {
            return state.loadingCampaigns;
        },
        getLoadingCharacters: (state): boolean => {
            return state.loadingCharacters;
        },
        getLoadingInitiative: (state): boolean => {
            return state.loadingInitiative;
        },
        getTargetSession: (state): Session => {
            return state.targetSession;
        },
        getTargetInitiativeId: (state): number => {
            return state.targetInitiativeId
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
        getCharacterById(id: number | string | string[]): any {
            return this.getCharacters.find((character: any) => {
                return character.id == id;
            });
        },
        getInitiativeById(id: number): any {
            return this.getInitiative.find((initiative: any) => {
                return initiative.id === id;
            });
        },
        setTargetSession(payload: Session): void {
            this.targetSession = payload;
        },
        setTargetInitiativeId(id: number): void {
            this.targetInitiativeId = id;
        },
        async fetchCampaigns(): Promise<void> {
            const { data, error } = await supabase
            .from(SupabaseNamesEnum.TABLE_CAMPAIGN)
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.campaigns = data;
                this.loadingCampaigns = false;
            }
        },
        async fetchCharacters(): Promise<void> {
            const { data, error } = await supabase
            .from(SupabaseNamesEnum.TABLE_CHARACTERS)
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.characters = data;
                this.loadingCharacters = false;
            }
        },
        async fetchInitiative(): Promise<void> {
            const { data, error } = await supabase
            .from(SupabaseNamesEnum.TABLE_INITIATIVE)
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.initiative = data;
                this.loadingInitiative = false;
            }
        },
    }
})
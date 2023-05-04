import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';
import { Campaign, Session } from '@/interfaces/Campaign.interface';
import { Character } from '@/interfaces/Character.interface';
import { InitiativeItem } from '@/interfaces/InitiativeItem.interface';
import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';
import axios from 'axios';

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
        monstersList: [] as any,
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
            return state.targetInitiativeId;
        },
        getMonstersList: (state): any => {
            return state.monstersList;
        }
    },
    actions: {
        setUserData(payload: any): void {
            this.userData = payload;
        },
        setCampaigns(payload: any): void {
            this.campaigns = payload;
        },
        setCharacters(payload: any): void {
            this.characters = payload;
        },
        setInitiative(payload: any): void {
            this.initiative = payload;
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
                this.setCampaigns(data);
                this.loadingCampaigns = false;
            }
        },
        async fetchCharacters(): Promise<void> {
            const { data, error } = await supabase
            .from(SupabaseNamesEnum.TABLE_CHARACTERS)
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.setCharacters(data);
                this.loadingCharacters = false;
            }
        },
        async fetchInitiative(): Promise<void> {
            const { data, error } = await supabase
            .from(SupabaseNamesEnum.TABLE_INITIATIVE)
            .select()
            .eq('email', this.getUserData.email);
            if (data) {
                this.setInitiative(data);
                this.loadingInitiative = false;
            }
        },
        async fetchMonstersList(): Promise<void> {
            try {
                const response = await axios.get("https://www.dnd5eapi.co/api/monsters");
                if (response) {
                    this.monstersList = response.data.results;
                }
            }
            catch (error) {
                console.error(error);
            }
        },
    }
})
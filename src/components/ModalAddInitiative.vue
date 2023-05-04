<template>
    <div class="modal-content">
        <h2 class="modal-title">Add to Initiative</h2>
        <div v-if="!viewType" class="button-group">
            <button @click="viewType = 'character'" class="button button-primary">Add Character</button>
            <button @click="viewType = 'monster'" class="button button-primary">Add Monster</button>
        </div>
        <div v-if="viewType === 'character'" class="add-character-initiative-container">
            <div class="button-list" v-if="globalStore.getCharacters.length">
                <button @click="addToInitiative(character)" class="button button-primary" v-for="(character, index) of globalStore.getCharacters" :key="index">
                    {{ character.name }}
                </button>
            </div>
            <p class="text-center" v-if="!globalStore.getCharacters.length">You have no characters. Visit the Characters page to create characters.</p>
        </div>
        <div v-if="viewType === 'monster'" class="add-monster-initiative-container">
            <form @submit="(e) => searchMonster(e)" class="modal-form">
                <div class="field">
                    <label for="search">Search Monster</label>
                    <input v-model="searchValue" type="text" class="form-input">
                </div>
                <div class="field">
                    <input class="button button-primary" type="submit" value="Search">
                </div>
            </form>
            <p class="text-center" v-if="populatedMonsters && !populatedMonsters.length">No monsters found. Try modifying your search.</p>
            <div class="button-list" v-if="populatedMonsters && populatedMonsters.length">
                <button 
                    @click="addMonster(monster)" 
                    class="button button-primary" 
                    v-for="(monster, index) of populatedMonsters" 
                    :key="index"
                    >
                    {{ monster.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { Character } from '@/interfaces/Character.interface';
    import { supabase } from '@/lib/supabaseClient';
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';
    import { generateId } from '@/lib/utils';
    import axios from 'axios';

    export default defineComponent({
        name: 'ModalAddInitiative',
        data() {
            return {
                globalStore: useGlobalStore(),
                supabaseNames: SupabaseNamesEnum,
                viewType: null as string | null,
                searchValue: '',
                dndApi: 'https://www.dnd5eapi.co',
                populatedMonsters: null as any,
            }
        },
        methods: {
            async addToInitiative(member: any): Promise<void> {
                const { error } = await supabase
                .from(this.supabaseNames.TABLE_INITIATIVE)
                .insert({
                    id: generateId(),
                    email: this.globalStore.getUserData.email,
                    name: member.name,
                    health: member.maxHp,
                    armorClass: member.armorClass,
                    conditions: [],
                });
                if (error) {
                    console.error(error);
                } else {
                    this.globalStore.fetchInitiative();
                    this.globalStore.closeModal();
                }
            },
            searchMonster(e: any): void {
                e.preventDefault();
                if (this.searchValue.length) {
                    const filtered = this.globalStore.getMonstersList.filter((monster: any) => {
                        return monster.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase());
                    });
                    if (filtered) {
                        this.populatedMonsters = filtered
                    } else {
                        this.populatedMonsters = [];
                    }
                }
            },
            async addMonster(monster: any): Promise<void> {
                try {
                    const response = await axios.get(this.dndApi + monster.url);
                    if (response) {
                        const monsterData = {
                            name: response.data.name,
                            maxHp: response.data.hit_points,
                            armorClass: response.data.armor_class[0].value
                        }
                        this.addToInitiative(monsterData);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            },
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .button-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-top: 2rem;
        }
    }
</style>
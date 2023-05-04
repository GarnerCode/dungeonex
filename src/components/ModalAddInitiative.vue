<template>
    <div class="modal-content">
        <h2 class="modal-title">Add to Initiative</h2>
        <div v-if="!viewType" class="button-group">
            <button @click="viewType = 'character'" class="button button-primary">Add Character</button>
            <button @click="viewType = 'monster'" class="button button-primary">Add Monster</button>
        </div>
        <div v-if="viewType === 'character'" class="add-character-initiative-container">
            <div class="initiative-character-list">
                <button @click="addToInitiative(character)" class="button button-primary" v-for="(character, index) of globalStore.getCharacters" :key="index">
                    {{ character.name }}
                </button>
            </div>
        </div>
        <div v-if="viewType === 'monster'" class="add-monster-initiative-container">

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

    export default defineComponent({
        name: 'ModalAddInitiative',
        data() {
            return {
                globalStore: useGlobalStore(),
                supabaseNames: SupabaseNamesEnum,
                viewType: null as string | null,
            }
        },
        methods: {
            async addToInitiative(member: Character): Promise<void> {
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
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .initiative-character-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
    }
</style>
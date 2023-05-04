<template>
    <div class="modal-content" v-if="updatedCharacter">
        <h2 class="modal-title">Edit Character</h2>
        <form @submit="(e) => submitCharacterEdit(e)" class="modal-form">
            <div class="field">
                <label for="name">Name</label>
                <input v-model="updatedCharacter.name" class="form-input" name="race" type="text">
            </div>
            <div class="field">
                <label for="race">Race</label>
                <input v-model="updatedCharacter.race" class="form-input" name="race" type="text">
            </div>
            <div class="field">
                <label for="class">Class</label>
                <input v-model="updatedCharacter.class" class="form-input" name="class" type="text">
            </div>
            <div class="field">
                <label for="level">Level</label>
                <input v-model="updatedCharacter.level" class="form-input" name="level" type="number">
            </div>
            <div class="field">
                <label for="strength">Strength</label>
                <input v-model="updatedCharacter.stats.strength" class="form-input" name="strength" type="number">
            </div>
            <div class="field">
                <label for="dexterity">Dexterity</label>
                <input v-model="updatedCharacter.stats.dexterity" class="form-input" name="dexterity" type="number">
            </div>
            <div class="field">
                <label for="constitution">Constitution</label>
                <input v-model="updatedCharacter.stats.constitution" class="form-input" name="constitution" type="number">
            </div>
            <div class="field">
                <label for="intelligence">Intelligence</label>
                <input v-model="updatedCharacter.stats.intelligence" class="form-input" name="intelligence" type="number">
            </div>
            <div class="field">
                <label for="wisdom">Wisdom</label>
                <input v-model="updatedCharacter.stats.wisdom" class="form-input" name="wisdom" type="number">
            </div>
            <div class="field">
                <label for="charisma">Charisma</label>
                <input v-model="updatedCharacter.stats.charisma" class="form-input" name="charisma" type="number">
            </div>
            <div class="field">
                <label for="armorClass">Armor Class</label>
                <input v-model="updatedCharacter.armorClass" class="form-input" name="armorClass" type="number">
            </div>
            <div class="field">
                <label for="maxHp">Max Hit-Points</label>
                <input v-model="updatedCharacter.maxHp" class="form-input" name="maxHp" type="number">
            </div>
            <div class="field">
                <label for="speed">Speed</label>
                <input v-model="updatedCharacter.speed" class="form-input" name="speed" type="number">
            </div>
            <div class="field">
                <label for="notes">Notes</label>
                <textarea v-model="updatedCharacter.notes" class="form-input form-textarea" name="notes"></textarea>
            </div>
            <div class="field">
                <input class="button button-primary" type="submit" value="Submit">
            </div>
            <button @click="globalStore.openModal(modalTypes.DELETE_CHARACTER)" class="button button-secondary">Delete Character</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { supabase } from '@/lib/supabaseClient';
    import { useGlobalStore } from '@/store/globalStore';
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';

    export default defineComponent({
        name: 'ModalEditCharacter',
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
                supabaseNames: SupabaseNamesEnum,
                updatedCharacter: null as any,
            }
        },
        mounted() {
            const character = this.globalStore.getCharacterById(this.$route.params.id);
            if (character) {
                this.updatedCharacter = character;
            }
        },
        methods: {
            async submitCharacterEdit(e: any): Promise<void> {
                e.preventDefault();
                const characterId = this.$route.params.id;
                if (
                    this.updatedCharacter.name.length && 
                    this.updatedCharacter.race.length && 
                    this.updatedCharacter.class.length) {
                        const { error } = await supabase
                        .from(this.supabaseNames.TABLE_CHARACTERS)
                        .update(this.updatedCharacter)
                        .eq('id', characterId);
                        if (error) {
                            console.error(error)
                        } else {
                            this.globalStore.fetchCharacters();
                            this.globalStore.closeModal();
                        }
                    }
            }
        }
    })
</script>
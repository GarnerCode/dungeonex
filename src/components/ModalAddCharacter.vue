<template>
    <div class="modal-content">
        <h2 class="modal-title">Add Character</h2>
        <form @submit="(e) => createCharacter(e)" class="modal-form">
            <div class="field">
                <label for="name">Name</label>
                <input v-model="newCharacter.name" class="form-input" name="race" type="text">
            </div>
            <div class="field">
                <label for="race">Race</label>
                <input v-model="newCharacter.race" class="form-input" name="race" type="text">
            </div>
            <div class="field">
                <label for="class">Class</label>
                <input v-model="newCharacter.class" class="form-input" name="class" type="text">
            </div>
            <div class="field">
                <label for="level">Level</label>
                <input v-model="newCharacter.level" class="form-input" name="level" type="number">
            </div>
            <div class="field">
                <label for="strength">Strength</label>
                <input v-model="newCharacter.strength" class="form-input" name="strength" type="number">
            </div>
            <div class="field">
                <label for="dexterity">Dexterity</label>
                <input v-model="newCharacter.dexterity" class="form-input" name="dexterity" type="number">
            </div>
            <div class="field">
                <label for="constitution">Constitution</label>
                <input v-model="newCharacter.constitution" class="form-input" name="constitution" type="number">
            </div>
            <div class="field">
                <label for="intelligence">Intelligence</label>
                <input v-model="newCharacter.intelligence" class="form-input" name="intelligence" type="number">
            </div>
            <div class="field">
                <label for="wisdom">Wisdom</label>
                <input v-model="newCharacter.wisdom" class="form-input" name="wisdom" type="number">
            </div>
            <div class="field">
                <label for="charisma">Charisma</label>
                <input v-model="newCharacter.charisma" class="form-input" name="charisma" type="number">
            </div>
            <div class="field">
                <label for="armorClass">Armor Class</label>
                <input v-model="newCharacter.armorClass" class="form-input" name="armorClass" type="number">
            </div>
            <div class="field">
                <label for="maxHp">Max Hit-Points</label>
                <input v-model="newCharacter.maxHp" class="form-input" name="maxHp" type="number">
            </div>
            <div class="field">
                <label for="notes">Notes</label>
                <textarea v-model="newCharacter.notes" class="form-input form-textarea" name="notes"></textarea>
            </div>
            <div class="field">
                <input class="button button-primary" type="submit" value="Submit">
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { generateId } from '@/lib/utils';
    import { supabase } from '@/lib/supabaseClient';
    import { useGlobalStore } from '@/store/globalStore';
    
    export default defineComponent({
        name: 'ModalAddCharacter',
        data() {
            return {
                globalStore: useGlobalStore(),
                newCharacter: {
                    id: generateId,
                    email: useGlobalStore().getUserData.email,
                    created_at: new Date(),
                    name: '',
                    race: '',
                    class: '',
                    level: 0,
                    strength: 0,
                    dexterity: 0,
                    constitution: 0,
                    intelligence: 0,
                    wisdom: 0,
                    charisma: 0,
                    armorClass: 0,
                    maxHp: 0,
                    notes: '',
                    imageUrl: '',
                }
            }
        },
        methods: {
            async createCharacter(e: any): Promise<void> {
                e.preventDefault();
                console.log('Creating character: ', this.newCharacter);
                if (this.newCharacter.name.length && this.newCharacter.race.length && this.newCharacter.class.length) {
                    console.log('Running supabase function');
                    const { error } = await supabase
                    .from('characters')
                    .insert(this.newCharacter);
                    if (error) {
                        console.error(error);
                    } else {
                        this.globalStore.fetchCharacters();
                        this.globalStore.closeModal();
                    }
                }
            }
        }
    })
</script>
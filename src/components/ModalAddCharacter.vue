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
                <input v-model="newCharacter.stats.strength" class="form-input" name="strength" type="number">
            </div>
            <div class="field">
                <label for="dexterity">Dexterity</label>
                <input v-model="newCharacter.stats.dexterity" class="form-input" name="dexterity" type="number">
            </div>
            <div class="field">
                <label for="constitution">Constitution</label>
                <input v-model="newCharacter.stats.constitution" class="form-input" name="constitution" type="number">
            </div>
            <div class="field">
                <label for="intelligence">Intelligence</label>
                <input v-model="newCharacter.stats.intelligence" class="form-input" name="intelligence" type="number">
            </div>
            <div class="field">
                <label for="wisdom">Wisdom</label>
                <input v-model="newCharacter.stats.wisdom" class="form-input" name="wisdom" type="number">
            </div>
            <div class="field">
                <label for="charisma">Charisma</label>
                <input v-model="newCharacter.stats.charisma" class="form-input" name="charisma" type="number">
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
                <label for="speed">Speed</label>
                <input v-model="newCharacter.speed" class="form-input" name="speed" type="number">
            </div>
            <div class="field">
                <label for="notes">Notes</label>
                <textarea v-model="newCharacter.notes" class="form-input form-textarea" name="notes"></textarea>
            </div>
            <!-- <div class="field">
                <label for="characterImage">Character Image</label>
                <input name="characterImage" accept="image/*" type="file">
            </div> -->
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
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum'
    
    export default defineComponent({
        name: 'ModalAddCharacter',
        data() {
            return {
                globalStore: useGlobalStore(),
                supabaseNames: SupabaseNamesEnum,
                newCharacter: {
                    id: generateId,
                    email: useGlobalStore().getUserData.email,
                    created_at: new Date(),
                    name: '',
                    race: '',
                    class: '',
                    level: 0,
                    stats: {
                        strength: 0,
                        dexterity: 0,
                        constitution: 0,
                        intelligence: 0,
                        wisdom: 0,
                        charisma: 0,
                    },
                    armorClass: 0,
                    maxHp: 0,
                    speed: 0,
                    notes: '',
                    imageUrl: '',
                }
            }
        },
        methods: {
            async createCharacter(e: any): Promise<void> {
                e.preventDefault();
                if (this.newCharacter.name.length && this.newCharacter.race.length && this.newCharacter.class.length) {
                    // this.handleImageUpload(e);
                    console.log('Creating character: ', this.newCharacter);
                    const { error } = await supabase
                    .from(this.supabaseNames.TABLE_CHARACTERS)
                    .insert(this.newCharacter);
                    if (error) {
                        console.error(error);
                    } else {
                        this.globalStore.fetchCharacters();
                        this.globalStore.closeModal();
                    }
                }
            },
            // async handleImageUpload(e: any): Promise<void> {
            //     const file = e.target.characterImage.files[0];
            //     const fileName = generateId();
            //     const { data, error } = await supabase.storage
            //     .from(this.supabaseNames.BUCKET_PUBLIC)
            //     .upload(`${this.supabaseNames.STORAGE_CHARIMG}/${fileName}`, file, {
            //         cacheControl: '3600',
            //         upsert: false,
            //     });
            //     if (error) {
            //         console.error(error);
            //     } else if (data) {
            //         console.log('File data: ', data);
            //         this.newCharacter.imageUrl = data.path;
            //     }
            // },
        }
    })
</script>
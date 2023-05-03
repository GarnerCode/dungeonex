<template>
    <div class="modal-content">
        <h2 class="modal-title">Delete Character</h2>
        <p class="modal-message">Are you sure you want to delete this character? This cannot be undone.</p>
        <div class="button-group">
            <button @click="handleDeleteCharacter()" class="button button-secondary">Delete</button>
            <button @click="globalStore.closeModal()" class="button button-primary">Cancel</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, Static } from 'vue';
    import { supabase } from '@/lib/supabaseClient';
    import { useGlobalStore } from '@/store/globalStore';
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';
    import { StaticRoutesEnum } from '@/enum/StaticRoutes.enum';

    export default defineComponent({
        name: 'ModalDeleteCharacter',
        data() {
            return {
                globalStore: useGlobalStore(),
                supabaseNames: SupabaseNamesEnum,
                staticRoutes: StaticRoutesEnum,
            }
        },
        methods: {
            async handleDeleteCharacter(): Promise<void> {
                const selectedCharacter = this.globalStore.getCharacterById(this.$route.params.id);
                const { error } = await supabase
                .from(this.supabaseNames.TABLE_CHARACTERS)
                .delete()
                .eq('id', selectedCharacter.id);
                if (error) {
                    console.error(error);
                } else {
                    this.$router.push(this.staticRoutes.CHARACTERS);
                    this.globalStore.fetchCharacters();
                    this.globalStore.closeModal();
                }
            }
        }
    })
</script>
<template>
    <div class="modal-content">
        <h2 class="modal-title">Delete Member</h2>
        <p class="modal-message">Are you sure you want to delete this member from initiative? This cannot be undone.</p>
        <div class="button-group">
            <button @click="handleDeleteInitiative()" class="button button-secondary">Delete</button>
            <button @click="globalStore.closeModal()" class="button button-primary">Cancel</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { supabase } from '@/lib/supabaseClient';
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';

    export default defineComponent({
        name: 'ModalDeleteInitiative',
        data() {
            return {
                globalStore: useGlobalStore(),
                supabaseNames: SupabaseNamesEnum,
            }
        },
        methods: {
            async handleDeleteInitiative(): Promise<void> {
                const selectedMemberId = this.globalStore.getTargetInitiativeId;
                const { error } = await supabase
                .from(this.supabaseNames.TABLE_INITIATIVE)
                .delete()
                .eq('id', selectedMemberId);
                if (error) {
                    console.error(error)
                } else {
                    this.globalStore.fetchInitiative();
                    this.globalStore.closeModal();
                }
            }
        }
    })
</script>
<template>
    <div class="modal-content">
        <h2 class="modal-title">Delete Campaign</h2>
        <p class="modal-message">Are you sure you want to delete this campaign? This cannot be undone.</p>
        <div class="button-group">
            <button @click="handleDeleteCampaign()" class="button button-secondary">Delete</button>
            <button @click="globalStore.closeModal()" class="button button-primary">Cancel</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { supabase } from '@/lib/supabaseClient';
    import { useGlobalStore } from '@/store/globalStore';

    export default defineComponent({
        name: 'ModalDeleteCampaign',
        data() {
            return {
                globalStore: useGlobalStore(),
            }
        },
        methods: {
            async handleDeleteCampaign(): Promise<void> {
                const selectedCampaign = this.globalStore.getCampaignById(this.$route.params.id);
                const { error } = await supabase
                .from('campaigns')
                .delete()
                .eq('id', selectedCampaign.id);
                if (error) {
                    console.error(error);
                } else {
                    this.$router.push('/campaigns');
                    this.globalStore.fetchCampaigns();
                    this.globalStore.closeModal();
                }
            }
        }
    })
</script>
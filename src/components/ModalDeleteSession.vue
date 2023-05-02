<template>
    <div class="modal-content">
        <h2 class="modal-title">Delete Session</h2>
        <p class="modal-message">Are you sure you want to delete this session? This cannot be undone.</p>
        <div class="button-group">
            <button @click="handleDeleteSession()" class="button button-secondary">Delete</button>
            <button @click="globalStore.closeModal()" class="button button-primary">Cancel</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { supabase } from '@/lib/supabaseClient';
    import { useGlobalStore } from '@/store/globalStore';
    import { Session } from '@/interfaces/Campaign.interface';

    export default defineComponent({
        name: 'ModalDeleteSession',
        data() {
            return {
                globalStore: useGlobalStore(),
            }
        },
        methods: {
            async handleDeleteSession(): Promise<void> {
                const activeCampaign = this.globalStore.getCampaignById(this.$route.params.id);
                const targetSession = this.globalStore.getTargetSession;
                const filteredSessions = activeCampaign.sessionsList.filter((session: Session) => {
                    return session.id !== targetSession.id
                });
                activeCampaign.sessionsList = filteredSessions;
                const { error } = await supabase
                .from('campaigns')
                .update({
                    sessionsList: activeCampaign.sessionsList
                })
                .eq('id', activeCampaign.id);
                if (error) {
                    console.error(error);
                } else {
                    this.globalStore.fetchCampaigns();
                    this.globalStore.closeModal();
                }
            }
        }
    })
</script>
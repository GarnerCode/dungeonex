<template>
    <div class="modal-content">
        <h2 class="modal-title">Add Session</h2>
        <form @submit="(e) => createSession(e)" class="modal-form">
            <div class="field">
                <label for="campaignTitle">Title</label>
                <input class="form-input" v-model="newSession.title" type="text" name="campaignTitle">
            </div>
            <div class="field">
                <label for="campaignSummary">Summary</label>
                <textarea class="form-input form-textarea" v-model="newSession.summary" name="campaignSummary"></textarea>
            </div>
            <div class="field">
                <input class="button button-primary" type="submit" value="Submit">
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabaseClient';
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { generateId } from '@/lib/utils';
    import { Campaign } from '@/interfaces/Campaign.interface';

    export default defineComponent({
        name: 'ModalAddSession',
        data() {
            return {
                globalStore: useGlobalStore(),
                newSession: {
                    id: generateId(),
                    title: '',
                    summary: '',
                },
                activeCampaign: {} as Campaign,
            }
        },
        mounted() {
            const campaign = this.globalStore.getCampaignById(this.$route.params.id);
            if (campaign) {
                this.activeCampaign = campaign;
            }
        },
        methods: {
            async createSession(e: any): Promise<void> {
                e.preventDefault();
                this.activeCampaign.sessionsList.push(this.newSession);
                if (this.newSession.title.length && this.newSession.summary.length) {
                    const { error } = await supabase
                    .from('campaigns')
                    .update({
                        sessionsList: this.activeCampaign.sessionsList
                    })
                    .eq('id', this.activeCampaign.id);
                    if (error) {
                        console.error(error);
                    } else {
                        this.globalStore.closeModal();
                    }
                }
            }
        }
    })
</script>
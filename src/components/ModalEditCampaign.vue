<template>
    <div class="modal-content" v-if="activeCampaign">
        <h2 class="modal-title">Edit Campaign</h2>
        <form @submit="(e) => submitCampaignEdit(e)" class="modal-form">
            <div class="field">
                <label for="campaignTitle">Title</label>
                <input class="form-input" v-model="activeCampaign.title" type="text" name="campaignTitle">
            </div>
            <div class="field">
                <label for="campaignSummary">Summary</label>
                <textarea class="form-input form-textarea" v-model="activeCampaign.summary" name="campaignSummary"></textarea>
            </div>
            <div class="field">
                <input class="button button-primary" type="submit" value="Update">
            </div>
            <button @click="globalStore.openModal(modalTypes.DELETE_CAMPAIGN)" class="button button-secondary">Delete Campaign</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabaseClient';
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';

    export default defineComponent({
        name: 'ModalEditCampaign',
        data() {
            return {
                globalStore: useGlobalStore(),
                activeCampaign: null as any,
                modalTypes: ModalTypesEnum,
                supabaseNames: SupabaseNamesEnum,
            }
        },
        mounted() {
            const campaign = this.globalStore.getCampaignById(this.$route.params.id);
            if (campaign) {
                this.activeCampaign = campaign;
            }
        },
        methods: {
            async submitCampaignEdit(e: any): Promise<void> {
                e.preventDefault();
                const campaignId = this.$route.params.id
                if (this.activeCampaign.title.length && this.activeCampaign.summary.length) {
                    const { error } = await supabase
                    .from(this.supabaseNames.TABLE_CAMPAIGN)
                    .update({
                        title: this.activeCampaign.title,
                        summary: this.activeCampaign.summary
                    })
                    .eq('id', campaignId);
                    if (error) {
                        console.error(error);
                    } else {
                        this.globalStore.fetchCampaigns();
                        this.globalStore.closeModal();
                    }
                }
            },
        }
    })
</script>
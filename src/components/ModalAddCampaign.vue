<template>
    <div class="modal-content">
        <h2 class="modal-title">Create Campaign</h2>
        <form @submit="(e) => createCampaign(e)" class="modal-form">
            <div class="field">
                <label for="campaignTitle">Title</label>
                <input class="form-input" v-model="newCampaign.title" type="text" name="campaignTitle">
            </div>
            <div class="field">
                <label for="campaignSummary">Summary</label>
                <textarea class="form-input form-textarea" v-model="newCampaign.summary" name="campaignSummary"></textarea>
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
    import { generateId } from '@/lib/utils';
    import { useGlobalStore } from '@/store/globalStore';
    import { SupabaseNamesEnum } from '@/enum/SupabaseNames.enum';

    export default defineComponent({
        name: 'ModalAddCampaign',
        data() {
            return {
                globalStore: useGlobalStore(),
                newCampaign: {
                    title: '',
                    summary: '',
                },
                supabaseNames: SupabaseNamesEnum,
            }
        },
        methods: {
            async createCampaign(e: any): Promise<void> {
                e.preventDefault();
                if (this.newCampaign.title.length && this.newCampaign.summary.length) {
                    const { error } = await supabase
                    .from(this.supabaseNames.TABLE_CAMPAIGN)
                    .insert({
                        id: generateId(),
                        email: this.globalStore.getUserData.email,
                        created_at: new Date(),
                        title: this.newCampaign.title,
                        summary: this.newCampaign.summary,
                        sessionsList: [],
                    });
                    if (error) {
                        console.error(error);
                    } else {
                        this.globalStore.fetchCampaigns();
                        this.globalStore.closeModal();
                    }
                }
            }
        }
    })
</script>

<style lang="scss">

</style>
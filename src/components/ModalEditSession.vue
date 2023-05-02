<template>
    <div class="modal-content">
        <h2 class="modal-title">Edit Session</h2>
        <form @submit="(e) => submitSessionEdit(e)" class="modal-form">
            <div class="field">
                <label for="campaignTitle">Title</label>
                <input class="form-input" v-model="updatedSession.title" type="text" name="campaignTitle">
            </div>
            <div class="field">
                <label for="campaignSummary">Summary</label>
                <textarea class="form-input form-textarea" v-model="updatedSession.summary" name="campaignSummary"></textarea>
            </div>
            <div class="field">
                <input class="button button-primary" type="submit" value="Update">
            </div>
            <button @click="handleDeleteClick()" class="button button-secondary">Delete Session</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabaseClient';
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import { Session } from '@/interfaces/Campaign.interface';

    export default defineComponent({
        name: 'ModalEditSession',
        data() {
            return {
                globalStore: useGlobalStore(),
                updatedSession: {
                    id: 0,
                    title: '',
                    summary: '',
                },
                modalTypes: ModalTypesEnum,
            }
        },
        mounted() {
            this.updatedSession = this.globalStore.getTargetSession;
        },
        methods: {
            async submitSessionEdit(e: any): Promise<void> {
                e.preventDefault();
                const activeCampaign = this.globalStore.getCampaignById(this.$route.params.id);
                const updatedSessionsList = activeCampaign.sessionsList.filter((session: Session) => {
                    return session.id !== this.updatedSession.id;
                });
                updatedSessionsList.push(this.updatedSession);
                if (this.updatedSession.title.length && this.updatedSession.summary.length) {
                    const { error } = await supabase
                    .from('campaigns')
                    .update({
                        sessionsList: updatedSessionsList,
                    })
                    .eq('id', activeCampaign.id);
                    if (error) {
                        console.error(error);
                    } else {
                        this.globalStore.fetchCampaigns();
                        this.globalStore.closeModal();
                    }
                }
            },
            handleDeleteClick(): void {
                this.globalStore.openModal(this.modalTypes.DELETE_SESSION);
            }
        }
    })
</script>
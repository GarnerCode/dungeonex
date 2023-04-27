<template>
    <div class="campaigns-view dash-view">
        <h1 class="dash-view-header">Campaigns</h1>
        <button @click="globalStore.setModalToggled(true)" class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <div class="dash-view-content">
            <ul class="campaigns-list">
                <li class="campaign-list-item">
                    <CampaignSummary></CampaignSummary>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import CampaignSummary from '@/components/CampaignSummary.vue';

    export default defineComponent({
        name: 'CampaignsView',
        data() {
            return {
                globalStore: useGlobalStore(),
            }
        },
        components: {
            CampaignSummary,
        }
    })
</script>
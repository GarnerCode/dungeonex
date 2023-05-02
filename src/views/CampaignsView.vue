<template>
    <div class="campaigns-view dash-view">
        <h1 class="dash-view-header">Campaigns</h1>
        <button @click="globalStore.openModal(modalTypes.ADD_CAMPAIGN)" class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <div class="dash-view-content">
            <ul class="dash-list" v-if="globalStore.getCampaigns">
                <li class="dash-list-item-container" v-for="(campaign, id) of globalStore.getCampaigns" :key="id">
                    <CampaignSummary @click="navToCampaign(campaign.id)" :campaign="campaign"></CampaignSummary>
                </li>
            </ul>
            <h2 class="dash-list-no-items" v-if="!globalStore.getCampaigns?.length && !globalStore.getLoadingCampaigns">
                No Campaigns
            </h2>
            <div class="dash-list-loading" v-if="globalStore.getLoadingCampaigns">
                Loading
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import CampaignSummary from '@/components/CampaignSummary.vue';

    export default defineComponent({
        name: 'CampaignsView',
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
            }
        },
        components: {
            CampaignSummary,
        },
        methods: {
            navToCampaign(id: number | string | string[]): void {
                this.$router.push(`/campaign-details/${id}`);
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .campaigns-view {
            h2 {
                text-align: center;
            }
        }
    }
</style>
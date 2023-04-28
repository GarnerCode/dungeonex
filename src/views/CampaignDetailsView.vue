<template>
    <div class="campaign-details-view dash-view" v-if="campaign">
        <h1 class="dash-view-header">{{ campaign.title }}</h1>
        <button class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </button>
        <div class="view-content">
            <div class="column">
                <p>{{ campaign.summary }}</p>
            </div>
            <div class="column">
                <h2 class="sessions-list-title">Sessions</h2>
                <ul class="sessions-list">
                    <li v-for="(session, index) of campaign.sessionsList" :key="index">
                        <Session :session="session"></Session>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import Session from '@/components/Session.vue';

    export default defineComponent({
        name: 'CampaignDetailsView',
        data() {
            return {
                globalStore: useGlobalStore(),
                campaign: null as any,
            }
        },
        components: {
            Session,
        },
        mounted() {
            if (this.globalStore.getCampaigns) {
                this.getSelectedCampaign();
            }
        },
        watch: {
            'globalStore.getCampaigns': {
                handler: function (val) {
                    if (val) {
                        this.getSelectedCampaign();
                    }
                }
            }
        },
        methods: {
            getSelectedCampaign(): void {
                const campaignId = this.$route.params.id;
                console.log('campaignId: ', campaignId);
                console.log('campaigns list: ', this.globalStore.getCampaigns);
                this.campaign = this.globalStore.getCampaigns.find((campaign: any) => {
                    return campaign.id == campaignId;
                });
                console.log('campaign: ', this.campaign);
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .campaign-details-view {
            .sessions-list-title {
                text-align: center;
            }
        }
    }
</style>
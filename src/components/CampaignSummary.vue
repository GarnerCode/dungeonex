<template>
    <div class="dash-list-item" v-if="campaign">
        <div class="dash-list-item-title">
            {{ campaign.title }}
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CampaignSummary',
        props: {
            campaign: {
                type: Object,
            }
        },
    })
</script>
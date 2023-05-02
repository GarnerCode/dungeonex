<template>
    <div class="campaign-summary" v-if="campaign">
        <div class="campaign-summary-title">
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

<style lang="scss">
    @media screen and (min-width: 0px) {
        .campaign-summary {
            display: flex;
            flex-direction: row;
            gap: 3rem;
            background-color: var(--color-black-light);
            padding: 1rem 2rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            .campaign-summary-color-code {
                width: 3rem;
                height: 3rem;
                background-color: red;
                border-radius: 100%;
            }
            .campaign-summary-title {
                font-size: 2.5rem;
                color: var(--color-white);
            }
        }
    }
</style>
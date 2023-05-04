<template>
    <div class="home-view dash-view">
        <h1 class="dash-view-header">Home</h1>
        <div class="panels-container">
            <div @click="handlePanelClick(panel.label)" class="home-panel" v-for="(panel, index) of panelData" :key="index">
                <h2>{{ panel.label }}</h2>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { homePanelData } from '@/constants/homePanelData';

    export default defineComponent({
        name: 'HomeView',
        data() {
            return {
                globalStore: useGlobalStore(),
                panelData: homePanelData,
            }
        },
        methods: {
            handlePanelClick(label: string): void {
                this.$router.push(`/${label.toLocaleLowerCase()}`);
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .home-view {
            .panels-container {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 2rem;
            }
            .home-panel {
                background-color: var(--color-black-light);
                width: calc(50% - 1rem);
                height: 20rem;
                border-radius: var(--border-radius);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
</style>
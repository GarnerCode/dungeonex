<template>
    <div class="initiative-view dash-view">
        <h1 class="dash-view-header">Initiative</h1>
        <button @click="globalStore.openModal(modalTypes.ADD_INITIATIVE)" class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <ul class="dash-list">
            <li>
                <InitiativeItem v-for="(initiative, index) of globalStore.getInitiative" :key="index" :initiative="initiative"></InitiativeItem>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import InitiativeItem from '@/components/InitiativeItem.vue';

    export default defineComponent({
        name: 'InitiativeView',
        components: {
            InitiativeItem,
        },
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
            }
        }
    })
</script>
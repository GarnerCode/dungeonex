<template>
    <div class="initiative-view dash-view" v-if="initiativeList">
        <h1 class="dash-view-header">Initiative</h1>
        <button @click="globalStore.openModal(modalTypes.ADD_INITIATIVE)" class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <div class="dash-view-content">
            <ul class="dash-list" v-if="initiativeList.length">
                <li v-for="(initiative, index) of initiativeList" :key="index">
                    <InitiativeItem :initiative="initiative"></InitiativeItem>
                </li>
            </ul>
            <h2 class="dash-list-no-items" v-if="!initiativeList.length">Initiative is Empty</h2>
        </div>
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
                dragedElem: null as any,
                overElem: null as any,
                initiativeList: null as any,
            }
        },
        mounted() {
            const list = this.globalStore.getInitiative;
            if (list) {
                this.initiativeList = list;
            }
        },
        watch: {
            'globalStore.getInitiative': {
                handler: function (val) {
                    if (val) {
                        this.initiativeList = val;
                    }
                }
            }
        },
    })
</script>
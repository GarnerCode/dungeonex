<template>
    <div class="dash-list-item initiative-item" v-if="initiative">
        <div class="list-item-header">
            <div class="dash-list-item-title">{{ initiative.name }}</div>
            <div class="detail">
                <div class="detail-label">AC: </div>
                <div class="detail-value">{{ initiative.armorClass }}</div>
            </div>
            <div class="detail">
                <div class="detail-label">HP: </div>
                <div class="detail-value">{{ initiative.health }}</div>
            </div>
            <font-awesome-icon @click="editInitiative()" :icon="['fas', 'pen-to-square']" />
        </div>
        <div v-if="initiative.conditions.length" class="initiative-conditions">
            <div class="condition" v-for="(condition, index) of initiative.conditions" :key="index">
                {{ condition }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';

    export default defineComponent({
        name: 'InitiativeItem',
        props: {
            initiative: {
                type: Object,
            }
        },
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
                detailsToggled: false,
            }
        },
        methods: {
            editInitiative(): void {
                this.globalStore.setTargetInitiativeId(this.initiative?.id);
                this.globalStore.openModal(this.modalTypes.EDIT_INITIATIVE);
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .initiative-item {
            flex-direction: column;
        }
        .list-item-header {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            svg {
                color: var(--color-white);
                cursor: pointer;
            }
            .detail {
                color: var(--color-white);
                display: flex;
                flex-direction: row;
                gap: 1rem;
            }
        }
        .initiative-conditions {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .condition {
            color: var(--color-white);
        }
    }
</style>
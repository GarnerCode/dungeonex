<template>
    <div class="session" v-if="session">
        <div class="session-header">
            <h3 class="session-title">{{ session.title }}</h3>
            <div class="session-date">{{ session.created_at }}</div>
            <font-awesome-icon @click="handleEditSessionClick()" :icon="['fas', 'pen-to-square']" />
        </div>
        <hr>
        <p class="session-summary">{{ session.summary }}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';

    export default defineComponent({
        name: 'Session',
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
            }
        },
        props: {
            session: null,
        },
        methods: {
            handleEditSessionClick(): void {
                this.globalStore.setTargetSession(this.session);
                this.globalStore.openModal(this.modalTypes.EDIT_SESSION);
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .session {
            background-color: var(--color-black-light);
            padding: 2rem;
            border-radius: var(--border-radius);
            .session-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                color: var(--color-white);
            }
            svg {
                color: var(--color-white);
                cursor: pointer;
                &:hover {
                    color: var(--color-primary);
                }
            }
            hr {
                border: 1px solid var(--color-black);
            }
            .session-summary {
                text-align: justify;
            }
        }
    }
</style>
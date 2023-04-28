<template>
    <div class="modal-overlay">
        <button @click="globalStore.closeModal()" class="dash-action-button button-secondary">
            <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
        <div class="modal">
            <ModalConfirmSignup v-if="globalStore.getActiveModalType === modalTypes.SIGNUP_CONFIRMATION"></ModalConfirmSignup>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import ModalConfirmSignup from './ModalConfirmSignup.vue';

    export default defineComponent({
        name: 'Modal',
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
            }
        },
        components: {
            ModalConfirmSignup,
        },
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .modal-overlay {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            background-color: rgba(0,0,0,0.3);
            backdrop-filter: blur(5px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .modal {
                background-color: var(--color-black-light);
                padding: 2rem;
                border-radius: var(--border-radius);
                color: var(--color-white);
                width: 40rem;
            }
        }
    }
</style>
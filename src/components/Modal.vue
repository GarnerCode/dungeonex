<template>
    <div class="modal-overlay">
        <button @click="globalStore.closeModal()" class="dash-action-button button-secondary">
            <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
        <div class="modal">
            <ModalConfirmSignup v-if="globalStore.getActiveModalType === modalTypes.SIGNUP_CONFIRMATION"></ModalConfirmSignup>
            <ModalAddCampaign v-if="globalStore.getActiveModalType === modalTypes.ADD_CAMPAIGN"></ModalAddCampaign>
            <ModalEditCampaign v-if="globalStore.getActiveModalType === modalTypes.EDIT_CAMPAIGN"></ModalEditCampaign>
            <ModalDeleteCampaign v-if="globalStore.getActiveModalType === modalTypes.DELETE_CAMPAIGN"></ModalDeleteCampaign>
            <ModalAddSession v-if="globalStore.getActiveModalType === modalTypes.ADD_SESSION"></ModalAddSession>
            <ModalDeleteSession v-if="globalStore.getActiveModalType === modalTypes.DELETE_SESSION"></ModalDeleteSession>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';

    import ModalConfirmSignup from './ModalConfirmSignup.vue';
    import ModalAddCampaign from './ModalAddCampaign.vue';
    import ModalEditCampaign from './ModalEditCampaign.vue';
    import ModalDeleteCampaign from './ModalDeleteCampaign.vue';
    import ModalAddSession from './ModalAddSession.vue';
    import ModalDeleteSession from './ModalDeleteSession.vue';

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
            ModalAddCampaign,
            ModalEditCampaign,
            ModalDeleteCampaign,
            ModalAddSession,
            ModalDeleteSession,
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
        .modal-title {
            text-align: center;
        }
        .modal-form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-top: 2rem;
            .form-input, .form-textarea {
                background-color: var(--color-black);
                width: calc(100% - 4rem);
                font-size: 16px;
                padding: 1rem 2rem;
                resize: none;
            }
            .form-textarea {
                height: 20rem;
            }
            label {
                display: block;
                margin-bottom: 1rem;
            }
        }
    }
</style>
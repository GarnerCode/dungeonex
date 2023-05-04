<template>
    <div class="modal-overlay">
        <button @click="globalStore.closeModal()" class="dash-action-button button-secondary">
            <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
        <div class="modal panel">
            <ModalConfirmSignup v-if="globalStore.getActiveModalType === modalTypes.SIGNUP_CONFIRMATION"></ModalConfirmSignup>

            <ModalAddCampaign v-if="globalStore.getActiveModalType === modalTypes.ADD_CAMPAIGN"></ModalAddCampaign>
            <ModalEditCampaign v-if="globalStore.getActiveModalType === modalTypes.EDIT_CAMPAIGN"></ModalEditCampaign>
            <ModalDeleteCampaign v-if="globalStore.getActiveModalType === modalTypes.DELETE_CAMPAIGN"></ModalDeleteCampaign>

            <ModalAddSession v-if="globalStore.getActiveModalType === modalTypes.ADD_SESSION"></ModalAddSession>
            <ModalEditSession v-if="globalStore.getActiveModalType === modalTypes.EDIT_SESSION"></ModalEditSession>
            <ModalDeleteSession v-if="globalStore.getActiveModalType === modalTypes.DELETE_SESSION"></ModalDeleteSession>

            <ModalAddCharacter v-if="globalStore.getActiveModalType === modalTypes.ADD_CHARACTER"></ModalAddCharacter>
            <ModalEditCharacter v-if="globalStore.getActiveModalType === modalTypes.EDIT_CHARACTER"></ModalEditCharacter>
            <ModalDeleteCharacter v-if="globalStore.getActiveModalType === modalTypes.DELETE_CHARACTER"></ModalDeleteCharacter>

            <ModalAddInitiative v-if="globalStore.getActiveModalType === modalTypes.ADD_INITIATIVE"></ModalAddInitiative>
            <ModalEditInitiative v-if="globalStore.getActiveModalType === modalTypes.EDIT_INITIATIVE"></ModalEditInitiative>
            <ModalDeleteInitiative v-if="globalStore.getActiveModalType === modalTypes.DELETE_INITIATIVE"></ModalDeleteInitiative>
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
    import ModalEditSession from './ModalEditSession.vue';
    import ModalDeleteSession from './ModalDeleteSession.vue';

    import ModalAddCharacter from './ModalAddCharacter.vue';
    import ModalEditCharacter from './ModalEditCharacter.vue';
    import ModalDeleteCharacter from './ModalDeleteCharacter.vue';

    import ModalAddInitiative from './ModalAddInitiative.vue';
    import ModalEditInitiative from './ModalEditInitiative.vue';
    import ModalDeleteInitiative from './ModalDeleteInitiative.vue';

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
            ModalEditSession,
            ModalDeleteSession,

            ModalAddCharacter,
            ModalEditCharacter,
            ModalDeleteCharacter,

            ModalAddInitiative,
            ModalEditInitiative,
            ModalDeleteInitiative,
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
                width: 40rem;
                overflow-y: auto;
                max-height: 60rem;
            }
        }
        .modal-title {
            text-align: center;
            margin-bottom: 2rem;
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
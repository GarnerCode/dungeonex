<template>
    <div class="modal-content">
        <p class="modal-message">Thank you for signing up! Please check your email for a confirmation code.</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ModalConfirmSignup',
    })
</script>

<style lang="scss">
    .modal-message {
        font-size: 16px;
        text-align: center;
    }
</style>
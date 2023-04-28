<template>
    <div class="settings-view dash-view">
        <h1 class="dash-view-header">Settings</h1>
        <p class="user-name">Signed in as {{ globalStore.getUserData?.email }}</p>
        <button @click="handleSignout()" class="button button-primary">Signout</button>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabaseClient';
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';

    export default defineComponent({
        name: 'SettingsView',
        data() {
            return {
                globalStore: useGlobalStore(),
            }
        },
        methods: {
            async handleSignout() {
                const { error } = await supabase.auth.signOut();
                this.globalStore.setUserData(null);
                this.$router.push('/login');
            }
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .settings-view {
            .user-name {
                text-align: center;
            }
        }
    }
</style>
<template>
    <div class="settings-view dash-view">
        <h1 class="dash-view-header">Settings</h1>
        <button @click="handleSignout()" class="button button-primary">Signout</button>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabaseClient';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'SettingsView',
        methods: {
            async handleSignout() {
                const { error } = await supabase.auth.signOut()
            }
        }
    })
</script>
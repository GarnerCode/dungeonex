<template>
    <div class="home-view dash-view">
        <h1 class="dash-view-header">Home</h1>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';

    export default defineComponent({
        name: 'HomeView',
        data() {
            return {
                globalStore: useGlobalStore(),
            }
        },
        mounted() {
            console.log(this.globalStore.getUserData);
        }
    })
</script>
<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="dashboard-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGlobalStore } from '@/store/globalStore';
  import Navbar from '@/components/Navbar.vue';

  export default defineComponent({
    name: 'DashboardView',
    data() {
      return {
        globalStore: useGlobalStore(),
      }
    },
    components: {
      Navbar,
    },
    mounted() {
      this.globalStore.fetchCampaigns();
    }
  });
</script>

<style lang="scss">
  @media screen and (min-width: 0px) {
    
  }
</style>

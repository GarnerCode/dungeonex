<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="dashboard-container">
      <router-view></router-view>
    </div>
    <Modal v-if="globalStore.getModalToggled"></Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGlobalStore } from '@/store/globalStore';
  import Navbar from '@/components/Navbar.vue';
  import Modal from '@/components/Modal.vue';

  export default defineComponent({
    name: 'DashboardView',
    data() {
      return {
        globalStore: useGlobalStore(),
      }
    },
    components: {
      Navbar,
      Modal,
    }
  });
</script>

<style lang="scss">
  @media screen and (min-width: 0px) {
    
  }
</style>

<template>
  <div>
    <div class="version">
      Alpha 0.2
    </div>
    <Modal v-if="globalStore.getModalToggled"></Modal>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGlobalStore } from './store/globalStore';
  import Modal from '@/components/Modal.vue';
  import { supabase } from '@/lib/supabaseClient';
  import { StaticRoutesEnum } from './enum/StaticRoutes.enum';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        globalStore: useGlobalStore(),
        staticRoutes: StaticRoutesEnum,
      }
    },
    components: {
      Modal,
    },
    async mounted() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        this.globalStore.setUserData(session.user);
        this.fetchAllData();
      } else {
        this.$router.push(this.staticRoutes.LOGIN);
      }
    },
    methods: {
      fetchAllData(): void {
        this.globalStore.fetchCampaigns();
        this.globalStore.fetchCharacters();
        this.globalStore.fetchInitiative();
      }
    }
  })
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  :root {
    --color-black: #1f1f1f;
    --color-black-light: #2b2b2b;
    --color-black-dark: #141414;
    --color-white: #FFF;
    --color-primary: #e20b4c;

    --border-radius: 15px;
  }
  * {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }
  html {
    overflow-x: hidden;
    overflow-y: hidden;
    font-size: 62.5%;
    @media screen and (min-width: 112.5em) {
      font-size: 75%;
    }
        
    @media screen and (min-width: 85.375em) and (max-width: 75em) {
      font-size: 56.25%;
    }
        
    @media screen and (max-width: 56.25em) {
      font-size: 50%;
    }
        
    @media screen and (max-width: 28.125em) {
      font-size: 45%;
    }
  }
  body {
    margin: 0;
    background-color: var(--color-black);
  }
  h1, h2, h3 {
    margin: 0;
    color: var(--color-white);
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2.25rem;
  }
  p {
    font-size: 16px;
    color: var(--color-white);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-black-dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-primary);
  }
  #app {
    background-color: var(--color-black);
  }
  @media screen and (min-width: 0px) {
    #app {
      padding: 2rem;
    }
    .version {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
    .p-st {
      padding: 2rem;
    }
    .dash-view-header {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 3rem;
      color: var(--color-white);
    }
    .panel {
      background-color: var(--color-black-light);
      color: var(--color-white);
      border-radius: var(--border-radius);
      padding: 2rem;
    }
    .dash-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .dash-list-no-items {
      text-align: center;
    }
    .dash-list-loading {
      text-align: center;
    }
    .dash-list-item {
      display: flex;
      flex-direction: row;
      gap: 3rem;
      background-color: var(--color-black-light);
      padding: 1rem 2rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      .dash-list-item-title {
        font-size: 2.5rem;
        color: var(--color-white);
      }
    }
    .fine {
      font-size: 12px;
    }
    .button {
      display: block !important;
      width: 100% !important;
      border: none;
      border-radius: var(--border-radius);
      padding: 1rem 2rem;
      cursor: pointer;
    }
    .button-primary {
      background-color: var(--color-primary) !important;
      color: var(--color-white) !important;
      cursor: pointer;
    }
    .button-secondary {
      background-color: var(--color-white) !important;
      color: var(--color-black) !important;
      cursor: pointer;
    }
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .button-group-toggle {
      .button-group-button {
        background: none;
        border: 1px solid var(--color-primary);
        color: var(--color-white);
        padding: 1rem 2rem;
        cursor: pointer;
        &.active {
          background-color: var(--color-primary);
        }
        &.button-left {
          border-top-left-radius: var(--border-radius);
          border-bottom-left-radius: var(--border-radius);
        }
        &.button-right {
          border-top-right-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
        }
      }
    }
    .dash-action-button {
      border: none;
      border-radius: var(--border-radius);
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: 2rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 3rem;
      }
    }
    .form-input {
      font-size: 16px;
      background-color: var(--color-black-light);
      color: var(--color-white);
      padding: 1rem 2rem;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .form-select {
      font-size: 16px;
      background-color: var(--color-black);
      width: 100%;
      color: var(--color-white);
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
    }
    .error {
      color: red;
    }
  }
  @media screen and (min-width: 768px) {
    .button {
      width: 30rem !important;
      margin: 0 auto;
    }
  }
</style>

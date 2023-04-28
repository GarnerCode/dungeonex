<template>
  <div>
    <div class="version">
      Alpha 0.1
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

  export default defineComponent({
    name: 'App',
    data() {
      return {
        globalStore: useGlobalStore(),
      }
    },
    components: {
      Modal,
    },
    async mounted() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        this.globalStore.setUserData(session.user);
      } else {
        this.$router.push('/login');
      }
    }
  })
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  :root {
    --color-black: #1f1f1f;
    --color-black-light: #2b2b2b;
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
      margin-bottom: 2rem;
      color: var(--color-white);
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
      color: var(--color-primary) !important;
      cursor: pointer;
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
    }
    .error {
      color: red;
    }
  }
</style>

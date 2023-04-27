<template>
  <router-view/>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  :root {
    --color-black: #1f1f1f;
    --color-black-light: #2b2b2b;
    --color-white: #FFF;
    --color-primary: #000;

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
    .p-st {
      padding: 2rem;
    }
    .dash-view-header {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 2rem;
      color: var(--color-white);
    }
    .button-primary {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
    .button-secondary {
      background-color: var(--color-white);
      color: var(--color-primary) !important;
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
  }
</style>

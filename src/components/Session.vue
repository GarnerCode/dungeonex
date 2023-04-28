<template>
    <div class="session" v-if="session">
        <div class="session-header">
            <h3 class="session-title">{{ session.title }}</h3>
        </div>
        <hr>
        <p class="session-summary">{{ session.summary }}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Session',
        props: {
            session: {
                type: Object,
            }
        },
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .session {
            background-color: var(--color-black-light);
            padding: 2rem;
            border-radius: var(--border-radius);
            hr {
                border: 1px solid var(--color-black);
            }
        }
    }
</style>
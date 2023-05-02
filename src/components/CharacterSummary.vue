<template>
    <div class="dash-list-item" v-if="character">
        <div class="dash-list-item-title">
            {{ character.name }}
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CharacterSummary',
        props: {
            character: {
                type: Object,
            }
        },
    })
</script>
<template>
    <div class="characters-view dash-view">
        <h1 class="dash-view-header">Characters</h1>
        <button @click="globalStore.openModal(modalTypes.ADD_CHARACTER)" class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <div class="dash-view-content">
            <ul class="dash-list" v-if="globalStore.getCharacters">
                <li class="dash-list-item-container" v-for="(character, id) of globalStore.getCharacters" :key="id">
                    <CharacterSummary @click="navToCharacter(character.id)" :character="character"></CharacterSummary>
                </li>
            </ul>
            <h2 class="dash-list-no-items" v-if="!globalStore.getCharacters?.length && !globalStore.getLoadingCharacters">
                No Characters
            </h2>
            <h2 class="dash-list-loading" v-if="globalStore.getLoadingCharacters">
                Loading...
            </h2>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import CharacterSummary from '@/components/CharacterSummary.vue';

    export default defineComponent({
        name: 'CharactersView',
        data() {
            return {
                globalStore: useGlobalStore(),
                modalTypes: ModalTypesEnum,
            }
        },
        components: {
            CharacterSummary,
        },
        methods: {
            navToCharacter(id: number | string | string[]): void {
                this.$router.push(`/character-details/${id}`);
            }
        }
    })
</script>
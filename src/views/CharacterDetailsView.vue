<template>
    <div class="character-details-view dash-view" v-if="character">
        <h1 class="dash-view-header">{{ character.name }}</h1>
    </div>
</template>

<script lang="ts">
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
import { Character } from '@/interfaces/Character.interface';
import { useGlobalStore } from '@/store/globalStore';
import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CharacterDetailsView',
        data() {
            return {
                globalStore: useGlobalStore(),
                character: {} as Character,
                modalTypes: ModalTypesEnum,
            }
        },
        mounted() {
            if (this.globalStore.getCharacters) {
                this.getSelectedCharacter();
            }
        },
        methods: {
            getSelectedCharacter(): void {
                const characterId = this.$route.params.id;
                const character = this.globalStore.getCharacters.find((character: Character) => {
                    return character.id == characterId;
                });
                if (character) {
                    this.character = character;
                }
            }
        }
    })
</script>
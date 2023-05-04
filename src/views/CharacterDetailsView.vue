<template>
    <div class="character-details-view dash-view" v-if="character">
        <h1 class="dash-view-header">{{ character.name }}</h1>
        <button @click="globalStore.openModal(modalTypes.EDIT_CHARACTER)" class="dash-action-button button-primary">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </button>
        <div class="view-content">
            <div class="summary-row">
                <div class="column">
                    <div class="detail-label">Race</div>
                    <div class="detail-value">{{ character.race }}</div>
                </div>
                <div class="column">
                    <div class="detail-label">Class</div>
                    <div class="detail-value">{{ character.class }}</div>
                </div>
                <div class="column">
                    <div class="detail-label">Level</div>
                    <div class="detail-value">{{ character.level }}</div>
                </div>
            </div>
            <div class="stats-container">
                <ul class="stats-list panel">
                    <li class="stat-item" v-for="(value, key) in character.stats" :key="key">
                        <span class="detail-label">{{ key }}:</span>
                        <span class="detail-value">{{ value }}</span>
                    </li>
                </ul>
                <div class="misc-stats panel">
                    <div class="row">
                        <div class="detail-label">
                            Armor Class
                        </div>
                        <div class="detail-value">
                            {{ character.armorClass }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="detail-label">
                            Max Hit-Points
                        </div>
                        <div class="detail-value">
                            {{ character.maxHp }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="detail-label">
                            Speed
                        </div>
                        <div class="detail-value">
                            {{ character.speed }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="notes-container panel">
                <div class="detail-label">Notes</div>
                <p class="character-notes">{{ character.notes }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';
    import { Character } from '@/interfaces/Character.interface';
    import { useGlobalStore } from '@/store/globalStore';
    import { defineComponent } from 'vue';
    import { calculateModifier } from '@/lib/utils';

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
        watch: {
            'globalStore.getCharacters': {
                handler: function (val) {
                    if (val) {
                        this.getSelectedCharacter();
                    }
                }
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

<style lang="scss">
    @media screen and (min-width: 0px) {
        .character-details-view {
            .view-content {
                display: flex;
                flex-direction: column;
                gap: 3rem;
                color: var(--color-white);
            }
            .summary-row {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                .column {
                    text-align: center;
                    color: var(--color-white);
                }
            }
            .detail-label {
                font-weight: bold;
                text-transform: capitalize;
            }
            .stats-container {
                display: flex;
                flex-direction: row;
                gap: 3rem;
            }
            .stats-list {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                width: 100%;
            }
            .stat-item {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .misc-stats {
                width: 100%;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
            }
            .notes-container {
                overflow-y: auto;
                max-height: 25rem;
            }
            .character-notes {
                text-align: justify;
            }
        }
    }
</style>
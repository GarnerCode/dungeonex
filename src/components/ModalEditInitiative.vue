<template>
    <div class="modal-content" v-if="updatedInitiative">
        <h2 class="modal-title">Edit Initiative</h2>
        <form class="modal-form">
            <div class="field">
                <label for="health">Health</label>
                <input v-model="updatedInitiative.health" class="form-input" type="number" name="health">
            </div>
            <div class="field">
                <label for="condition">Condition</label>
                <select v-model="selectedCondition" @change="addCondition()" class="form-select" name="condition">
                    <option hidden>Select Condition</option>
                    <option v-for="(condition, index) of conditionsData" :key="index" :value="condition">{{ condition }}</option>
                </select>
            </div>
            <h3>Active Conditions <span class="fine">(Tap Condition to Remove)</span></h3>
            <ul class="conditions-list" v-if="updatedInitiative.conditions.length">
                <li @click="removeCondition(condition)" class="condition" v-for="(condition, index) of updatedInitiative.conditions" :key="index">
                    {{ condition }}
                </li>
            </ul>
            <div v-if="!updatedInitiative.conditions.length">No Active Conditions</div>
            <div class="field">
                <input class="button button-primary" type="submit" value="Update">
            </div>
            <button class="button button-secondary">Remove from Initiative</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { conditionsData } from '@/constants/conditionsData';

    export default defineComponent({
        name: 'ModalEditInitiative',
        data() {
            return {
                globalStore: useGlobalStore(),
                updatedInitiative: null as any,
                selectedCondition: '',
                conditionsData,
            }
        },
        mounted() {
            const target = this.globalStore.getInitiativeById(this.globalStore.getTargetInitiativeId);
            console.log('target: ', target);
            if (target) {
                this.updatedInitiative = target;
            }
        },
        methods: {
            // filterInactiveConditions(): Array<string> {

            // },
            addCondition(): void {
                this.updatedInitiative.conditions.push(this.selectedCondition);
            },
            removeCondition(target: string): void {
                const filtered = this.updatedInitiative.conditions.filter((condition: string) => {
                    return condition !== target
                });
                this.updatedInitiative.conditions = filtered;
            },
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .conditions-list {
            list-style:disc;
            padding-left: 2rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .condition {
                cursor: pointer;
            }
        }
    }
</style>
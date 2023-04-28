<template>
    <nav>
        <ul class="nav-list">
            <li class="nav-item" v-for="(nav, index) of navData" :key="index">
                <router-link class="nav-link" :to="nav.route">
                    <font-awesome-icon 
                    class="nav-icon" 
                    :class="{'active-route': $route.name === nav.label.toLocaleLowerCase()}" 
                    :icon="nav.icon" />
                    <div class="nav-label">
                        {{ nav.label }}
                    </div>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { navData } from '@/constants/navData';

    export default defineComponent({
        name: 'Navbar',
        data() {
            return {
                navData,
            }
        },
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        nav {
            background-color: var(--color-black-light);
            padding: 1rem 2rem;
            position: fixed;
            bottom: 2rem;
            width: calc(100vw - 8rem);
            height: 5rem;
            border-radius: var(--border-radius);
            display: flex;
            flex-direction: column;
            justify-content: center;
            .nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .nav-link {
                color: var(--color-white);
                text-decoration: none;
            }
            .nav-icon {
                font-size: 3rem;
                &.active-route {
                    color: var(--color-primary);
                }
            }
            .nav-label {
                display: none;
            }
        }
    }
</style>
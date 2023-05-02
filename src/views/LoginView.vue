<template>
    <div class="login-view">
        <img class="logo" src="@/assets/images/dnx-logo-full.svg" alt="DungeoNex Logo">
        <div class="button-group-toggle">
            <button @click="toggleSignup = false" class="button-group-button button-left" :class="{'active': !toggleSignup}">Login</button>
            <button @click="toggleSignup = true" class="button-group-button button-right" :class="{'active': toggleSignup}">Signup</button>
        </div>
        <form @submit="(e) => handleLogin(e)" class="login-view-form" v-if="!toggleSignup">
            <div class="field">
                <label for="userEmail">Email</label>
                <input v-model="loginFormData.email" class="form-input" type="email" name="userEmail">
            </div>

            <div class="field">
                <label for="userPassword">Password</label>
                <input v-model="loginFormData.password" class="form-input" type="password" name="userPassword">
            </div>

            <div class="field">
                <input class="button button-primary" type="submit" value="Login">
            </div>
        </form>
        <form @submit="(e) => handleSignup(e)" class="login-view-form" v-if="toggleSignup">
            <div class="field">
                <label for="userEmail">Email</label>
                <input v-model="signupFormData.email" class="form-input" type="email" name="userEmail">
            </div>

            <div class="field">
                <label for="userPassword">Password</label>
                <input v-model="signupFormData.password" class="form-input" type="password" name="userPassword">
            </div>

            <div class="field">
                <label for="userPassword">Confirm Password</label>
                <input v-model="signupFormData.confirmPassword" class="form-input" type="password" name="userPassword">
            </div>

            <div class="field">
                <input class="button button-primary" type="submit" value="Signup">
            </div>
        </form>
        <div class="error" v-if="supaErrorMsg.length">
            {{ supaErrorMsg }}
        </div>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabaseClient';
    import { defineComponent } from 'vue';
    import { useGlobalStore } from '@/store/globalStore';
    import { ModalTypesEnum } from '@/enum/ModalTypes.enum';

    export default defineComponent({
        name: 'LoginView',
        data() {
            return {
                globalStore: useGlobalStore(),
                toggleSignup: false,
                modalTypes: ModalTypesEnum,
                loginFormData: {
                    email: '',
                    password: '',
                },
                signupFormData: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                supaErrorMsg: '',
            }
        },
        async mounted() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log('session: ', session);
                this.globalStore.setUserData(session.user);
                this.$router.push('/');
            }
        },
        methods: {
            async handleLogin(e: any) {
                e.preventDefault();
                console.log('Running login');
                if (this.loginFormData.email !== '' && this.loginFormData.password !== '') {
                    console.log('Running if block');
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: this.loginFormData.email,
                        password: this.loginFormData.password
                    });
                    if (data.session) {
                        this.globalStore.setUserData(data.session.user);
                        this.$router.push('/');
                    } else if (error) {
                        this.supaErrorMsg = 'Email or Password is incorrect.';
                    }
                }
            },
            async handleSignup(e: any) {
                e.preventDefault();
                this.supaErrorMsg = '';
                if (
                    this.signupFormData.email !== '' &&
                    this.signupFormData.password !== '' &&
                    this.signupFormData.confirmPassword === this.signupFormData.password
                ) {
                    const { data, error } = await supabase.auth.signUp({
                        email: this.signupFormData.email,
                        password: this.signupFormData.password
                    });
                    if (error) {
                        this.supaErrorMsg = error.message;
                    } else if (!data.user?.identities?.length) {
                        this.supaErrorMsg = "Account already exists with this email."
                    } else {
                        this.globalStore.openModal(this.modalTypes.SIGNUP_CONFIRMATION);
                    }
                }
            },
        }
    })
</script>

<style lang="scss">
    @media screen and (min-width: 0px) {
        .login-view {
            display: flex;
            flex-direction: column;
            align-items: center;
            .logo {
                display: block;
                width: 30rem;
            }
            .login-view-form {
                width: 100%;
                margin: 3rem 0;

                label {
                    display: block;
                    color: var(--color-white);
                }
                .field {
                    margin: 2rem 0;
                }
                .form-input {
                    width: calc(100% - 4rem);
                }
            }
        }
    }
</style>
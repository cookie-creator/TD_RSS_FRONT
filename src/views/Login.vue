<script setup>
import store from "../store";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const router = useRouter();
const user = {
    email: '',
    password: '',
    remember: false
}
let errorMsg = ref('');
let errors = ref({ email: '', password: ''});

function login(ev) {
    ev.preventDefault();
    store.dispatch('login', user)
        .then((res) => {
            if (! res.error) {
                router.push({
                    name: 'Dashboard'
                })
            } else {
                if (res.data.email) {
                    errors.value.email = res.data.email[0];
                }
                if (res.data.password) {
                    errors.value.password = res.data.password[0];
                }
            }
        })
}
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        {{errorMsg}}

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit="login">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input
                            v-model="user.email"
                            id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div v-if="errors.email" class="text-red-500 text-sm">
                        {{ errors.email }}
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
<!--                        <div class="text-sm">-->
<!--                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>-->
<!--                        </div>-->
                    </div>
                    <div class="mt-2">
                        <input
                            v-model="user.password"
                            id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div v-if="errors.password" class="text-red-500 text-sm">
                        {{ errors.password }}
                    </div>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <router-link :to="{name: 'Register'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Please register
                </router-link>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>

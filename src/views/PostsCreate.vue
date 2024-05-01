<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
    import PageComponent from "../components/PageComponent.vue";
</script>


<template>
    <PageComponent title="Posts">
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Posts</h1>
                <router-link
                    :to="{ name: 'PostCreate' }"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                    Add new Post
                </router-link>
            </div>
        </template>
        <main>
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                Your content
            </div>
        </main>
    </PageComponent>
</template>

<style scoped>

</style>

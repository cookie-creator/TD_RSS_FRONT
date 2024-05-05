<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import HelloWorld from "../components/HelloWorld.vue";
import {mapState, useStore} from "vuex";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import router from "../router/index.js";
import NotificationSpan from "../components/NotificationSpan.vue";
import Pusher from "pusher-js";
import store from "../store/index.js";

const navigation = [
    { name: 'Dashboard', to: {name: 'Dashboard'}, current: true },
    { name: 'Posts', to: {name: 'PostsList'}, current: false },
    { name: 'Categories', to: {name: 'CategoriesList'}, current: false },
    { name: 'Notifications', to: {name: 'Notifications'}, current: false },
];
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
];
export default {
    components: {
      NotificationSpan,
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      Bars3Icon,
      BellIcon,
      XMarkIcon
    },
    computed: {
        ...mapState(['user'])
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const pusher = ref(false);
        const channel = ref(false);

        function logout() {
            store.commit('logout');
            router.push({
                name: 'Login'
            })
        }

        Pusher.logToConsole = true;

        store.dispatch("getUser")
          .then((res) => {
            // pusher.value = new Pusher(import.meta.env.VITE_APP_PUSHER_APP_KEY,
            //     {
            //       cluster: 'eu',
            //       channelAuthorization: {
            //         endpoint: import.meta.env.VITE_APP_REMOTE_API_URL + 'api/v1/broadcasting/auth'
            //       },
            //     });
            //
            // channel.value = pusher.value.subscribe('notification.User.' + res.user.id);
            // channel.value.bind('NewNotificationCreatedBroadcastEvent', function(data) {
            //   app.messages.peush(JSON.stringify(data));
            // });
        });

        return {
            user: computed(() => store.state.user.data),
            navigation,
            userNavigation,
            logout
        }
    }
}
</script>

<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <router-link
                                    v-for="item in navigation"
                                   :key="item.name"
                                   :to="item.to"
                                    active-class=""
                                   :class="[
                                       this.$route.name === item.name ?
                                       'bg-gray-900 text-white' :
                                       'text-gray-300 hover:bg-gray-700 hover:text-white',
                                       'rounded-md px-3 py-2 text-sm font-medium'
                                       ]">
                                    {{ item.name }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">View notifications</span>
                                <BellIcon class="h-6 w-6" aria-hidden="true" />
                            </button>

                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span class="absolute -inset-1.5" />
                                        <span class="sr-only">Open user menu</span>
                                        <svg enable-background="new -27 23 101 100" height="50px" id="malecostume_1_" version="1.1" viewBox="-27 23 101 100" width="101px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><circle cx="23" cy="73" fill="#F5EEE5" r="50"/><g><defs><circle cx="23" cy="73" id="SVGID_1_" r="50"/></defs><clipPath id="SVGID_2_"><use overflow="visible" xlink:href="#SVGID_1_"/></clipPath><path clip-path="url(#SVGID_2_)" d="M38,98.9l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8H-27v-9.8      c1.3-3.1,3.9-5.5,7.1-6.6L8,98.9V84h30V98.9z" fill="#D4B08C"/><g clip-path="url(#SVGID_2_)"><defs><path d="M38,98.9l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8H-27v-9.8c1.3-3.1,3.9-5.5,7.1-6.6L8,98.9V84h30V98.9z" id="SVGID_3_"/></defs><clipPath id="SVGID_4_"><use overflow="visible" xlink:href="#SVGID_3_"/></clipPath><polygon clip-path="url(#SVGID_4_)" fill="#1E1E23" points="23.2,103 16,103 11.2,98 -27,98 -27,123 23.2,123 73.3,123        73.3,98 35.2,98 30.4,103      "/><polygon clip-path="url(#SVGID_4_)" fill="#C1CAD4" points="23,103 24,103 38.7,95.3 32.9,124.2 23,123.1 13.1,124.2 7.3,95.3        22,103      "/><polygon clip-path="url(#SVGID_4_)" fill="#216DD9" points="20.5,112 25.5,112 29.5,124 16.5,124      "/><polygon clip-path="url(#SVGID_4_)" fill="#249CF2" points="12.5,103 33.5,103 25.5,112 20.5,112      "/><path clip-path="url(#SVGID_4_)" d="M38.5,93l-14.4,10l10.8,11L39,94L38.5,93z M7.5,93l14.4,10l-10.8,11L7,94       L7.5,93z" fill="#FFFFFF"/></g></g><path d="M23,97c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10S3,57.5,3,53.5     C3,47.8,8.1,39,23,39l0,0l0,0l0,0l0,0C37.9,39,43,47.8,43,53.5c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3     C26.5,96.7,24.5,97,23,97L23,97z" fill="#F2CEA5"/><path d="M30,83l-14,0c-0.4,0-0.6,0.4-0.4,0.8c1.3,2.3,3.7,3.5,6.7,3.7c3.1,0.2,6.5-1.3,8.1-3.7     C30.6,83.5,30.4,83,30,83z" fill="#A3705F"/><circle cx="32" cy="68" fill="#262626" r="2"/><circle cx="14" cy="68" fill="#262626" r="2"/><path d="M8,65c0,0,1.1-3,6.1-3c3.4,0,5.4,1.5,6.4,3" fill="none" stroke="#CC9872" stroke-width="2"/><path d="M38.1,65c0,0-1.1-3-6.1-3c-4.8,0-7,3-7,5c0,1.9,0,9,0,9" fill="none" stroke="#BB8660" stroke-width="2"/><path d="M41.8,71.2c0,0,0.8-6.3,3.7-7.2c0.4-1.8,1.5-7,1.5-9.9s-0.3-5.7-1.9-8.1c-1.8-2.6-5.6-4.1-7.6-4.1     c-2.3,1.4-7.7,4.6-9.4,6.5c-0.9,1,0.4,1.8,0.4,1.8s1.2-0.5,1.7-0.6c2.5-0.7,8-1.2,9.7,1.3C42,53.9,42,62.7,42,64     C42,65.2,41.8,71.2,41.8,71.2z" fill="#D98C21"/><path d="M0.5,64c2.9,1,3.7,7.2,3.7,7.2S4,65.2,4,64c0-1.6,0.2-9.1,3.4-12.7c3.6-4,8.4-5.3,11.1-3.5     c1.4,0.9,6.1,5.5,11.1,1.7c3-2.3,8.5-7.5,8.5-7.5s-2.9-8.9-16.1-7.9c-5.6,0.5-11.8-0.9-11.8-0.9s-0.1,2.5,0.9,3.8     C2.8,39.4,0.1,45.4-0.7,50c-0.2,0.9-0.3,1.8-0.3,2.7c0,0.5,0,1,0,1.4C-1,57,0.1,62.1,0.5,64z" fill="#E6A422"/></g></g></svg>
<!--                                        <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />-->
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem
                                            v-for="item in userNavigation"
                                            :key="item.name"
                                            v-slot="{ active }">
                                            <a
                                                :href="item.href"
                                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                                {{ item.name }}
                                            </a>
                                        </MenuItem>

                                        <MenuItem
                                            v-slot="{ active }">
                                            <a
                                                @click="logout"
                                                :class="['block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100']"
                                                href="#"
                                            >Sign out</a>
                                        </MenuItem>

                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <router-link
                        v-for="item in navigation"
                        :key="item.name" as="a"
                        :to="item.to"
                        active-class=""
                        :class="[
                           this.$route.name === item.name
                           ? 'bg-gray-900 text-white'
                           : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium'
                        ]">
                        {{ item.name }}</router-link>
                </div>
                <div class="border-t border-gray-700 pb-3 pt-4">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
<!--                            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />-->
                            <svg enable-background="new -27 23 101 100" height="50px" id="malecostume_1_" version="1.1" viewBox="-27 23 101 100" width="101px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><circle cx="23" cy="73" fill="#F5EEE5" r="50"/><g><defs><circle cx="23" cy="73" id="SVGID_1_" r="50"/></defs><clipPath id="SVGID_2_"><use overflow="visible" xlink:href="#SVGID_1_"/></clipPath><path clip-path="url(#SVGID_2_)" d="M38,98.9l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8H-27v-9.8      c1.3-3.1,3.9-5.5,7.1-6.6L8,98.9V84h30V98.9z" fill="#D4B08C"/><g clip-path="url(#SVGID_2_)"><defs><path d="M38,98.9l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8H-27v-9.8c1.3-3.1,3.9-5.5,7.1-6.6L8,98.9V84h30V98.9z" id="SVGID_3_"/></defs><clipPath id="SVGID_4_"><use overflow="visible" xlink:href="#SVGID_3_"/></clipPath><polygon clip-path="url(#SVGID_4_)" fill="#1E1E23" points="23.2,103 16,103 11.2,98 -27,98 -27,123 23.2,123 73.3,123        73.3,98 35.2,98 30.4,103      "/><polygon clip-path="url(#SVGID_4_)" fill="#C1CAD4" points="23,103 24,103 38.7,95.3 32.9,124.2 23,123.1 13.1,124.2 7.3,95.3        22,103      "/><polygon clip-path="url(#SVGID_4_)" fill="#216DD9" points="20.5,112 25.5,112 29.5,124 16.5,124      "/><polygon clip-path="url(#SVGID_4_)" fill="#249CF2" points="12.5,103 33.5,103 25.5,112 20.5,112      "/><path clip-path="url(#SVGID_4_)" d="M38.5,93l-14.4,10l10.8,11L39,94L38.5,93z M7.5,93l14.4,10l-10.8,11L7,94       L7.5,93z" fill="#FFFFFF"/></g></g><path d="M23,97c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10S3,57.5,3,53.5     C3,47.8,8.1,39,23,39l0,0l0,0l0,0l0,0C37.9,39,43,47.8,43,53.5c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3     C26.5,96.7,24.5,97,23,97L23,97z" fill="#F2CEA5"/><path d="M30,83l-14,0c-0.4,0-0.6,0.4-0.4,0.8c1.3,2.3,3.7,3.5,6.7,3.7c3.1,0.2,6.5-1.3,8.1-3.7     C30.6,83.5,30.4,83,30,83z" fill="#A3705F"/><circle cx="32" cy="68" fill="#262626" r="2"/><circle cx="14" cy="68" fill="#262626" r="2"/><path d="M8,65c0,0,1.1-3,6.1-3c3.4,0,5.4,1.5,6.4,3" fill="none" stroke="#CC9872" stroke-width="2"/><path d="M38.1,65c0,0-1.1-3-6.1-3c-4.8,0-7,3-7,5c0,1.9,0,9,0,9" fill="none" stroke="#BB8660" stroke-width="2"/><path d="M41.8,71.2c0,0,0.8-6.3,3.7-7.2c0.4-1.8,1.5-7,1.5-9.9s-0.3-5.7-1.9-8.1c-1.8-2.6-5.6-4.1-7.6-4.1     c-2.3,1.4-7.7,4.6-9.4,6.5c-0.9,1,0.4,1.8,0.4,1.8s1.2-0.5,1.7-0.6c2.5-0.7,8-1.2,9.7,1.3C42,53.9,42,62.7,42,64     C42,65.2,41.8,71.2,41.8,71.2z" fill="#D98C21"/><path d="M0.5,64c2.9,1,3.7,7.2,3.7,7.2S4,65.2,4,64c0-1.6,0.2-9.1,3.4-12.7c3.6-4,8.4-5.3,11.1-3.5     c1.4,0.9,6.1,5.5,11.1,1.7c3-2.3,8.5-7.5,8.5-7.5s-2.9-8.9-16.1-7.9c-5.6,0.5-11.8-0.9-11.8-0.9s-0.1,2.5,0.9,3.8     C2.8,39.4,0.1,45.4-0.7,50c-0.2,0.9-0.3,1.8-0.3,2.7c0,0.5,0,1,0,1.4C-1,57,0.1,62.1,0.5,64z" fill="#E6A422"/></g></g></svg>
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
                            <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
                        </div>
                        <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                        <DisclosureButton
                            v-for="item in userNavigation"
                            :key="item.name"
                            as="a"
                            :href="item.href"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >{{ item.name }}
                        </DisclosureButton>

                        <DisclosureButton
                            @click="logout"
                            as="a"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >Sign out
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>

        <router-view :key="$route.path"></router-view>

        <NotificationSpan />
    </div>
</template>

<style scoped>

</style>

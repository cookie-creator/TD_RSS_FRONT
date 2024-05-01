<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
    import PageComponent from "../components/PageComponent.vue";
    import {computed} from "vue";
    import {useStore} from "vuex";

    const store = useStore();
    const posts = computed(() => store.state.posts.data);

    store.dispatch("getPosts");

    function deletePost(post) {
      if (
          confirm(
              `Are you sure you want to delete this survey? Operation can't be undone!!`
          )
      ) {
        store.dispatch("deletePost", post.id).then(() => {
          store.dispatch("getPosts");
        });
      }
    }
</script>


<template>
    <PageComponent title="Posts">
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Posts</h1>
                <router-link
                    :to="{ name: 'PostsCreate' }"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                    <svg
                        class="h-4 w-4 mb-1 inline-block"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add new Post</span>
                </router-link>
            </div>
        </template>
        <main>
            <div class="mx-auto max-w-7xl py-6">
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

                    <div
                        v-for="post in posts"
                        :key="post.id"
                        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-grey-50 h-[470px]"
                    >
                        <img :src="post.image" alt="" class="w-full h-48 object-cover" />
                        <h4 class="mt-4 text-lg font-bold">{{post.description}}</h4>
                        <div v-html="post.content" class="overflow-hidden flex-1"></div>

                        <div class="flex justify-between items-center mt-3">
                            <router-link
                                :to="{ name: 'PostView', params: { id: post.id } }"
                                class="flex py-2 px-2
                                    border border-transparent text-sm rounded-md text-white
                                    bg-indigo-600 hover:bg-indigo-700
                                    focus:ring-2 focus-ring-offset-2 focus:ring-indigo-500
                                "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                     class="w-5 h-5 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                Edit
                            </router-link>
                            <button
                                v-if="post.id"
                                type="button"
                                @click="deletePost(post)"
                                class="h-8 w-8
                                    flex items-center justify-center
                                    rounded-full
                                    border border-transparent
                                    text-sm text-red-500
                                    focus:ring-2 focus-ring-offset-2 focus:ring-red-500
                                    "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                     class="w-5 h-5 mt-1 inline-bock text-sm text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    </PageComponent>
</template>

<style scoped>

</style>

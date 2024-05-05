<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
    import PageComponent from "../components/PageComponent.vue";
    //import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
    import {computed, watch} from "vue";
    import {useStore} from "vuex";
    import PostListItem from "../components/PostListItem.vue";
    import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
    import PaginationSpan from "../components/PaginationSpan.vue";
    import PostsListComponent from "../components/PostsListComponent.vue";

    const store = useStore();
    const posts = computed(() => store.state.posts);

    store.dispatch("getPosts");

    watch(
        () => store.state.posts.currentPage,
        (newVal, oldVal) => {
          currentPage.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: !!newVal.status,
          };
        }
    );

    function deletePost(post) {
      if (confirm(`Are you sure you want to delete this post?`)) {
        store.dispatch("deletePost", post.id).then(() => {
          store.dispatch("getPosts");
        });
      }
    }

    function changePage(newValue) {
      store.dispatch("getPosts", newValue);
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
                <ProgressLoadingSpan v-if="posts.loading" :loading="posts.loading" />
                <div v-else class="posts-main">
                  <div class="posts-main-list grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mb-2">
                    <PostListItem
                        v-for="(post) in posts.data"
                        :key="post.id"
                        :post="post"
                        @delete="deletePost(post)"
                    />
                  </div>

                  <PostsListComponent/>
                  <PaginationSpan :links="posts.links" @update="changePage" />
                </div>
            </div>
        </main>
    </PageComponent>
</template>

<style scoped>
  .posts-main-list {
    margin-bottom: 80px;
  }
</style>

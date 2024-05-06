<script setup>
  import {
    Combobox, ComboboxInput, ComboboxOption, ComboboxOptions,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  } from '@headlessui/vue';
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
  import PageComponent from "../components/PageComponent.vue";
  //import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
  import {computed, watch, ref} from "vue";
  import {useStore} from "vuex";
  import PostListItem from "../components/PostListItem.vue";
  import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
  import PaginationSpan from "../components/PaginationSpan.vue";
  import PostsListComponent from "../components/PostsListComponent.vue";

  const store = useStore();
  const posts = computed(() => store.state.posts);
  const categories = computed(() => store.state.categories.data);
  const listFilter = computed(() => store.state.postsFilter);
  const postId = ref(0);

  store.dispatch("getPosts");
  store.dispatch("getCategories").then(function () {
    store.commit('setPostsFilterCategoryDefault');
  });


  function changePage(page) {
    store.dispatch("getPosts", {
      page: page, category_id: listFilter.value.category_id === 0 ? false : listFilter.value.category_id
    });
  }

  function filterCategoryChanged() {
    store.dispatch("getPosts", {
      category_id: listFilter.value.category_id === 0 ? false : listFilter.value.category_id
    });
  }

  function filterSearchChanged() {
    store.dispatch("getPosts", {
      search: listFilter.value.search === '' ? '' : listFilter.value.search
    });
  }

  function filterSortingChanged() {
    store.dispatch("getPosts", {
      sorting: listFilter.value.sorting
    });
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
              <div class="grid grid-rows-1 grid-flow-col gap-4 mb-10">

                <div>
                  <div class="max-w-md">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                      <input
                          v-model="listFilter.search"
                          type="search" id="default-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Posts..." required />
                      <button
                          @click="filterSearchChanged"
                          type="submit"
                          class="text-white absolute end-0 top-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                  </div>
                </div>

                <div>
                  <select id="category_id" name="category_id"
                          v-model="listFilter.category_id"
                          @change="filterCategoryChanged"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option :value="0">
                      Choose category
                    </option>
                    <option v-for="category in categories" :value="category.id" :selected="category.id === listFilter.category_id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <select id="sorting" name="sorting"
                          v-model="listFilter.sorting"
                          @change="filterSortingChanged"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option v-for="sorting in listFilter.available_sorting" :value="sorting.value" :selected="sorting.value === listFilter.sorting">
                      {{ sorting.name }}
                    </option>
                  </select>
                </div>
              </div>

              <ProgressLoadingSpan v-if="posts.loading" :loading="posts.loading" />
              <div v-else class="posts-main">
<!--                <div class="posts-main-list grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mb-2">-->
<!--                  <PostListItem-->
<!--                      v-for="(post) in posts.data"-->
<!--                      :key="post.id"-->
<!--                      :post="post"-->
<!--                      @delete="deletePost(post)"-->
<!--                  />-->
<!--                </div>-->
                <PostsListComponent :posts="posts.data" />
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

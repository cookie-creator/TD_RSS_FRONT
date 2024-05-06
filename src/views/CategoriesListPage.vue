<script setup>
import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
import PageComponent from "../components/PageComponent.vue";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";
import CategoriesListItemComponent from "../components/CategoriesListItemComponent.vue";

const store = useStore();
const currentCategory = computed(() => store.state.currentCategory);
const categories = computed(() => store.state.categories.data);

store.dispatch("getCategories");

const editFormShow = ref(false);
const editFormAction = ref('edit');

let model = ref({
  id: 1,
  name: "",
  slug: "",
});

watch(
    () => store.state.currentCategory.data,
    (newVal, oldVal) => {
      model.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: !!newVal.status,
      };
    }
);

function deleteCategory(category) {
  if (confirm(`Are you sure you want to delete this category?`)) {
    store.commit("notify", {
      type: "success",
      message: "The category was successfully deleted",
    });
    store.dispatch("deleteCategory", category.id).then(() => {
      store.dispatch("getCategories");
    });
  }
}

function editCategory(category) {
  editFormShow.value = true;
  editFormAction.value = 'edit';
  store.dispatch("getCategory", category.id);
}

function createCategory() {
  model.value = {
    id: 1,
    name: "",
    slug: "",
  };
  editFormShow.value = true;
  editFormAction.value = 'create';
}

function saveCategory() {
  if (editFormAction.value === 'edit') {
    store.dispatch("updateCategory", {...model.value}).then(({data}) => {
      store.dispatch("getCategories");
    });
    store.commit("notify", {
      type: "success",
      message: "The category was successfully saved",
    });
  } else if (editFormAction.value === 'create') {
    store.dispatch("createCategory", {...model.value}).then(({data}) => {
      store.dispatch("getCategories");
    });
    store.commit("notify", {
      type: "success",
      message: "The category was successfully created",
    });
  }
}

</script>

<template>
  <PageComponent title="Posts">
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
        <button
            type="button"
            @click="createCategory"
            class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <svg
              class="h-4 w-4 mb-1 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          add category
        </button>
      </div>
    </template>
    <main>
      <div class="mx-auto max-w-7xl py-6">
        <div class="flex flex-row">
          <div class="basis-2/3">
            <ProgressLoadingSpan v-if="categories.loading" :loading="categories.loading" />
            <ul  role="list" class="divide-y divide-gray-100">
              <CategoriesListItemComponent
                  class="flex justify-between gap-x-6 py-5"
                  v-for="category in categories"
                  :key="category.id"
                  :category="category"
                  @delete="deleteCategory(category)"
                  @edit="editCategory(category)"
              />
            </ul>
          </div>
          <div class="basis-1/3">
            <form v-if="editFormShow" @submit.prevent="saveCategory" class="animate-fade-in-down">
              <div class="mx-8 p-8 bg-slate-100">
                <h2 v-if="editFormAction === 'create'" class="mb-2">Create new Category</h2>
                <h2 v-else-if="editFormAction === 'edit'" class="mb-2">Category: {{model.name}}</h2>

                <ProgressLoadingSpan v-if="currentCategory.loading" :loading="currentCategory.loading" />

                <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                  <div class="col-span-full pb-4">
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                      <input v-model="model.name"
                          type="text" name="name" id="title" autocomplete="name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div class="col-span-full pb-4">
                    <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">Slug</label>
                    <div class="mt-2">
                      <input v-model="model.slug"
                             type="text" name="slug" id="title" autocomplete="name"
                             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                  <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </PageComponent>
</template>

<style scoped>

</style>
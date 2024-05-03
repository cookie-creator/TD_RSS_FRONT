<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
    import PageComponent from "../components/PageComponent.vue";
    import {computed, ref} from "vue";
    import store from "../store/index.js";
    import {useRoute, useRouter} from "vue-router";
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {UserCircleIcon} from "@heroicons/vue/24/solid/index.js";
    import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";

    const router = useRouter();
    const route = useRoute();
    const categories = computed(() => store.state.categories);

    store.dispatch("getCategories");

    const editor = ClassicEditor;
    const editorConfig = {
      height: '500px'
    };

    // let model = ref({
    //   title : "",
    //   guid : "",
    //   date : "",
    //   description : "",
    //   thumbnail : "",
    //   content : "",
    //   link : "",
    //   category: "",
    //   category_id: false,
    //   slug : "",
    //   image : "",
    // });

    // for test
    let model = ref({
      title : "title",
      guid : "",
      date : "",
      description : "description",
      thumbnail : "",
      content : "",
      link : "",
      category: "",
      category_id: 1,
      slug : "",
      image : "",
    });


    function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          model.value.image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        //this.imageUrl = null;
      }
    }

    function savePost() {
      store.dispatch("createPost", { ...model.value }).then(({ data }) => {
        router.push({
          name: "PostView",
          params: { id: data.data.id },
        });
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
                    Add new Post
                </router-link>
            </div>
        </template>
        <main>
          <div class="mx-auto max-w-7xl">
            <form @submit.prevent="savePost" class="animate-fade-in-down">
              <div class="space-y-12">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="col-span-4">

                    <div class="col-span-full pb-3">
                      <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                      <div class="mt-2">
                        <input
                            v-model="model.title"
                            type="text" name="title" id="title" autocomplete="title"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div class="col-span-full pb-3">
                      <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                      <div class="mt-2">
                        <input
                            v-model="model.description"
                            type="text" name="description" id="description" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>


                    <div class="col-span-full pb-3">
                      <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
                      <div class="mt-1 flex items-center">
                        <img
                            v-if="model.image"
                            :src="model.image"
                            :alt="model.title"
                            class="w-64 h-64 object-cover mr-2"
                        />
                        <UserCircleIcon
                            v-if="!model.image"
                            class="h-12 w-12 text-gray-300" aria-hidden="true" />
                        <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          <input type="file" name="image"
                                 accept="image/png, image/jpeg, image/jpg"
                                 @change="handleFileChange"
                                 class="absolute  opacity-0 cursor-pointer">
                          Change
                        </button>
                      </div>
                    </div>

                  </div>

                  <div class="col-span-2">
                    <!--                          <div class="col-span-full">-->
                    <!--                            <p class="mt-1 text-sm leading-6 text-gray-600">Id {{model.guid}}</p>-->
                    <!--                          </div>-->

                    <div class="sm:col-span-4 pb-3">
                      <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">Slug</label>
                      <div class="mt-2">
                        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">website/post/</span>
                          <input
                              v-model="model.slug"
                              type="text" name="slug" id="slug" autocomplete="slug"
                              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="slug" />
                        </div>
                      </div>
                    </div>

                    <div class="sm:col-span-4 pb-3">
                      <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                      <div class="mt-2">
                        <ProgressLoadingSpan v-if="categories.loading" :loading="categories.loading" />
                        <select v-else
                            id="category_id" name="category_id"
                            v-model="model.category_id"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          <option :value="null">
                            Choose category
                          </option>
                          <option v-for="category in categories.data" :value="category.id" :selected="category.id === model.category_id">
                            {{ category.name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1 pb-3">
                      <label for="post-date" class="block text-sm font-medium leading-6 text-gray-900">Post date</label>
                      <div class="mt-2">
                        <input type="date" name="post-date" id="post-date" autocomplete="post-date"
                               v-model="model.date"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Text</label>
                    <div class="mt-2">
                      <ckeditor :editor="editor" v-model="model.content" :config="editorConfig"></ckeditor>
                    </div>
                  </div>


                  <!--                        <div class="col-span-full">-->
                  <!--                            <label for="context" class="block text-sm font-medium leading-6 text-gray-900">Content</label>-->
                  <!--                            <div class="mt-2">-->
                  <!--                                <textarea-->
                  <!--                                        v-model="model.content"-->
                  <!--                                        id="context" name="context" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />-->
                  <!--                            </div>-->
                  <!--                            <p class="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about post.</p>-->
                  <!--                        </div>-->

                </div>
                <hr>
              </div>
              <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
              </div>
            </form>
          </div>
        </main>
    </PageComponent>
</template>

<style scoped>
.ck-content {
  height: 500px;
}
.ck.ck-content {
  height: 500px;
}
.ck-editor__editable_inline {
  min-height: 500px;
}

.ck.ck-editor__editable_inline {
  height: 99px;
}
</style>

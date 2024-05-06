<script setup>

import {useStore} from "vuex";

const props = defineProps({
  posts: {
    type: Array
  }
});

const store = useStore();

function formatDatetime(date) {
  const datetime = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return datetime.toLocaleString('en-US', options);
}

const emit = defineEmits(["delete"]);

function deletePost(postId) {
  store.dispatch("deletePost", postId).then(() => {
    store.dispatch("getPosts");
  });
}

</script>

<template>
  <ul role="list" class="divide-y divide-gray-100">

    <li v-for="post in posts" :key="post.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img v-if="post.image" class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="post.image" alt="" />
        <div class="min-w-0 flex-auto">
          <router-link
            :to="{ name: 'PostView', params: { id: post.id } }"
            class="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-700" >{{ post.title }}</router-link>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ post.description }}</p>
        </div>
      </div>
      <div class="flex min-w-0 gap-x-4">
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ post.category_name }}</p>
          <p class="mt-1 text-xs leading-5 text-gray-500">
            Created <time :datetime="post.date">{{ formatDatetime(post.date) }}</time>
          </p>
        </div>
        <button
            v-if="post.id"
            type="button"
            @click="deletePost(post.id)"
            class="h-8 w-8
              flex items-center justify-center
              rounded-full
              border border-transparent
              text-sm text-red-500
              focus:ring-2 focus-ring-offset-2 focus:ring-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="w-5 h-5 mt-1 inline-bock text-sm text-red-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </li>
<!--    <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">-->
<!--      <div class="flex min-w-0 gap-x-4">-->
<!--        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />-->
<!--        <div class="min-w-0 flex-auto">-->
<!--          <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>-->
<!--          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">-->
<!--        <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>-->
<!--        <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">-->
<!--          Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>-->
<!--        </p>-->
<!--        <div v-else class="mt-1 flex items-center gap-x-1.5">-->
<!--          <div class="flex-none rounded-full bg-emerald-500/20 p-1">-->
<!--            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />-->
<!--          </div>-->
<!--          <p class="text-xs leading-5 text-gray-500">Online</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </li>-->
  </ul>
</template>

<style scoped>

</style>
<script setup>

const { category } = defineProps({
  category: Object
})

function formatDatetime(date) {
  const datetime = new Date(date);

  // Format the date and time as desired
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return datetime.toLocaleString('en-US', options);
}

const emit = defineEmits(["delete", "edit"]);
</script>

<template>
  <li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class=" leading-6 text-gray-900">
          {{ category.name }}
          <span class="text-sm text-gray-500">URL/{{ category.slug }}</span>
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          Created <time :datetime="category.created_at">{{ formatDatetime(category.created_at) }}</time>
        </p>
      </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <div class="mt-2 flex items-center justify-end gap-x-6">
        <button
            v-if="category.id"
            type="button"
            @click="emit('edit', category)"
            class="flex py-2 px-2
              border border-transparent text-sm rounded-md text-white
              bg-indigo-600 hover:bg-indigo-700
              focus:ring-2 focus-ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          Edit
        </button>
        <button
            v-if="category.id"
            type="button"
            @click="emit('delete', category)"
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
  </li>
</template>

<style scoped>

</style>
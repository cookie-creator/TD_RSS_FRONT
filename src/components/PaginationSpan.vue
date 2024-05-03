<script setup>
const props = defineProps({
  links: {
    type: Array
  }
})
const emit = defineEmits(["update"]);
function selectPage(page) {
  let currentPage = 0;
  props.links.forEach(link => {
    if (link.active) {
      currentPage = parseInt(link.label);
      return;
    }
  });

  if (parseInt(page) === 0 && currentPage !== 1) {
    //page = (currentPage === 1) ? currentPage : currentPage - 1;
    emit('update', currentPage - 1);
  } else if (parseInt(page) === props.links.length - 1 && currentPage !== props.links.length - 2) {
    //page = (currentPage === props.links.length - 2) ? currentPage : currentPage + 1;
    emit('update', currentPage + 1);
  } else {
    emit('update', page);
  }
  return false;
}

// function emitUpdate() {
//   this.$emit('update', this.internalValue);
// }
</script>

<template>
  <div class="flex justify-center mt-5">
    <nav
        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
    >
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <a
          v-for="(link, i) of links"
          :key="i"
          :disabled="!link.url"
          href="#"
          @click="selectPage(i)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === links.length - 1 ? 'rounded-r-md' : '',
            ]"
          v-html="link.label"
      >
      </a>
    </nav>
  </div>
</template>

<style scoped>

</style>
<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
    import PageComponent from "../components/PageComponent.vue";
    import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
    import PaginationSpan from "../components/PaginationSpan.vue";
    import {useStore} from "vuex";
    import {computed, watch} from "vue";

    const store = useStore();
    const notifications = computed(() => store.state.notifications);

    store.dispatch("getNotifications");

    function readNotification(notification) {
      store.dispatch("readNotification", notification.id).then(() => {
        store.dispatch("getNotifications");
      });
    }

    function unreadNotification(notification) {
      store.dispatch("unreadNotification", notification.id);
    }

    function changePage(newValue) {
      store.dispatch("getNotifications", newValue);
    }

    function formatDatetime(date) {
      const datetime = new Date(date);

      // Format the date and time as desired
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return datetime.toLocaleString('en-US', options);
    }
</script>

<template>
  <PageComponent title="Posts">
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Notifications</h1>
      </div>
    </template>
    <main>
      <div class="mx-auto max-w-7xl py-6">
        <ProgressLoadingSpan v-if="notifications.loading" :loading="notifications.loading" />
        <div v-else class="notifications-main">
          <div class="notifications-list mb-4">
            <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 ">
              <li v-for="notification in notifications.data" :key="notification.id"
                  class="flex justify-between gap-x-6 py-3 px-3
                    rounded-lg border-solid border shadow"
                  v-bind:class="(! notification.read) ? 'border-indigo-700' : 'border-gray-50'">
                <div class="flex min-w-0 gap-x-4">
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{{ notification.title }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ notification.description }}</p>
                  </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p class="mt-1 text-xs leading-5 text-gray-500">
                    Created <time :datetime="notification.date">{{ formatDatetime(notification.date) }}</time>
                  </p>
                  <div class="mt-1 flex items-center gap-x-1.5">
                    <a v-if="notification.read"
                       @click="unreadNotification(notification)"
                       class="text-sm text-zinc-700 border-b border-dashed border-zinc-700" href="#">Unread</a>
                    <a v-else
                       @click="readNotification(notification)"
                       class="text-sm text-indigo-700 border-b border-dashed border-indigo-700" href="#">Read</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <PaginationSpan :links="notifications.links" @update="changePage" />
        </div>
      </div>
    </main>
  </PageComponent>
</template>

<style scoped>
  .link-read {}
</style>

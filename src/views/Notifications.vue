<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
    import PageComponent from "../components/PageComponent.vue";
    import ProgressLoadingSpan from "../components/core/ProgressLoadingSpan.vue";
    import PaginationSpan from "../components/PaginationSpan.vue";
    import {useStore} from "vuex";
    import {computed, watch} from "vue";
    import NotificationSpan from "../components/NotificationSpan.vue";

    const store = useStore();
    const notifications = computed(() => store.state.notifications);

    store.dispatch("getNotifications");

    function readNotification(notification) {
      if (confirm(`Are you sure you want to delete this post?`)) {
        store.dispatch("readNotification", notification.id).then(() => {
          store.dispatch("getNotifications");
        });
      }
    }

    function changePage(newValue) {
      store.dispatch("getNotifications", newValue);
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
        {{notifications}}
        <ProgressLoadingSpan v-if="notifications.loading" :loading="notifications.loading" />
        <div v-else class="notifications-main">
          <div class="notifications-list grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mb-2">

            <ul role="list" class="divide-y divide-gray-100">
              <li v-for="notification in notifications" :key="person.email" class="flex justify-between gap-x-6 py-5">
                <div class="flex min-w-0 gap-x-4">
                  <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
                  </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
                  <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
                  </p>
                  <div v-else class="mt-1 flex items-center gap-x-1.5">
                    <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p class="text-xs leading-5 text-gray-500">Online</p>
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

</style>

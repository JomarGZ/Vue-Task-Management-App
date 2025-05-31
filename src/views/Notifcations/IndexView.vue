<script setup>
import NotificationItem from '@/components/NotificationItem.vue';
import { useNotificationAction } from '@/stores/notificationActionStore';
import { useNotificationDropdown } from '@/stores/notificationDropdown';
import { useNotificationList } from '@/stores/notificationListStore';
import { Icon } from '@iconify/vue';
import { isBefore, isSameDay, parseISO, startOfDay, subDays } from 'date-fns';
import { computed, onMounted } from 'vue';

const notificationsListStore = useNotificationList();
const notificationDropdownStore = useNotificationDropdown();

const notificationActionStore = useNotificationAction();
onMounted(async() => {
  await notificationsListStore.getNotifications();
})
const changeFilterType = (type) => {
  notificationsListStore.filterType = type;
  notificationsListStore.getNotifications(1, {type: type === 'all' ? null : type});
}
const getAllTodayNotifications = computed(() => {
  if (!notificationsListStore.notifications?.data) return [];
  const today = new Date();
  return notificationsListStore.notifications?.data?.filter(notification => {
    return notification.created_at && isSameDay(parseISO(notification.created_at), today);
  })
})
const getAllYesterdayNotifications = computed(() => {
  if (!notificationsListStore.notifications?.data) return [];
  const yesterday = subDays(new Date(), 1);
  return notificationsListStore.notifications.data.filter(notification => {
    return notification.created_at && isSameDay(parseISO(notification.created_at), yesterday);
  });
});

const getAllOlderNotifications = computed(() => {
  if (!notificationsListStore.notifications?.data) return [];
  const yesterdayStart = startOfDay(subDays(new Date(), 1));
  return notificationsListStore.notifications?.data?.filter(notification => {
    return notification.created_at && isBefore(parseISO(notification.created_at), yesterdayStart);
  })
})

const handleMarkAllAsRead = async () => {
  const success = await notificationActionStore.markAllAsRead();
  if (success) {
    await notificationsListStore.getNotifications();
    await notificationDropdownStore.getNotificationDrodDownData();
  }
}
const handleDeleteAll = async () => {
  const success = await notificationActionStore.deleteAllNotifications();
  if (success) {
    await notificationsListStore.getNotifications();
    await notificationDropdownStore.getNotificationDrodDownData();
  }
}
const handleDelete = async (id) => {
  const success = await notificationActionStore.deleteNotification(id);
  if (success) {
      await notificationsListStore.getNotifications();
      await notificationDropdownStore.getNotificationDrodDownData();
  }
}

const handleMarkAsRead = async (id) => {
  const success = await notificationActionStore.markAsReadNotification(id);
  if (success) {
    notificationsListStore.getNotifications();
    notificationDropdownStore.getNotificationDrodDownData();
  }
}

</script>

<template>
   <main class="max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">All Notifications</h2>
          <div class="flex space-x-2">
            <button type="button" @click="handleMarkAllAsRead" class="px-3 py-1 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 rounded-md">
              Mark all as read
            </button>
            <button  type="button" @click="handleDeleteAll" class="px-3 py-1 cursor-pointer text-sm font-medium text-red-600 hover:text-red-800 bg-red-50 rounded-md">
              Delete all
            </button>
          </div>
        </div>
        
        <div class="mt-4 flex space-x-2 overflow-x-auto pb-2">
          <button 
              type="button"
              v-for="type in ['all', 'unread']"
              :key="type"
              @click="changeFilterType(type)"
              class="px-3 py-1 text-sm font-medium cursor-pointer rounded-full capitalize"
              :class="notificationsListStore.filterType === type ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'"
              >
                {{ type }}
          </button>
        </div>
      </div>

      <div v-if="notificationsListStore.notifications?.data?.length > 0" class="divide-y divide-gray-200">
        <div v-if="getAllTodayNotifications.length > 0" class="px-6 py-3 bg-gray-50">
          <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Today</h3>
        </div>
       <NotificationItem
          v-for="notification in getAllTodayNotifications"
          :key="notification.id"
          :type="notification.data?.type"
          :redirectTo="notification.data?.link"
          :data="notification.data"
          :date="notification.created_at"
          @read-notification="handleMarkAsRead(notification.id)"
          @dismiss="handleDelete(notification.id)"
          :readAt="notification.read_at"
       />
        <div v-if="getAllYesterdayNotifications.length > 0" class="px-6 py-3 bg-gray-50">
          <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Yesterday</h3>
        </div>
        
        <NotificationItem
          v-for="notification in getAllYesterdayNotifications"
          :key="notification.id"
          :type="notification.data?.type"
          :redirectTo="notification.data?.link"
          :data="notification.data"
          :date="notification.created_at"
          @read-notification="notificationActionStore.markAsReadNotification(notification.id)"
          @dismiss="handleDelete(notification.id)"
          :readAt="notification.read_at"
        />
        <div v-if="getAllOlderNotifications.length > 0" class="px-6 py-3 bg-gray-50">
          <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Older</h3>
        </div>
        
        <NotificationItem
            v-for="notification in getAllOlderNotifications"
            :key="notification.id"
            :type="notification.data?.type"
            :data="notification.data"
            :date="notification.created_at"
            :redirectTo="notification.data?.link"
            @read-notification="notificationActionStore.markAsReadNotification(notification.id)"
            @dismiss="handleDelete(notification.id)"
            :readAt="notification.read_at"
        />
        <div v-if="notificationsListStore.notifications?.meta?.current_page < notificationsListStore.notifications?.meta?.last_page" class="px-6 py-4 text-center bg-gray-50">
          <div v-if="notificationsListStore.isFetchLoading"><Icon icon="eos-icons:three-dots-loading" width="24" height="24" /></div>
          <button v-else type="button" :disabled="notificationsListStore.isFetchLoading" @click="notificationsListStore.getNotifications(notificationsListStore.notifications?.meta?.current_page + 1, {type: notificationsListStore.filterType})" class="inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Load More Notifications
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-600 text-lg py-2">No notification found!</div>
    </div>
  </main>
</template>
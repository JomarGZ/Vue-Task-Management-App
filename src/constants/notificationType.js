
export const NOTIFICATION_TYPE = {
   COMMENT: {
        value: 'comment',
        type: 'task comment',
        icon : 'tabler:message-dots',
        badgeClass: 'bg-blue-100 text-blue-800'
   },
   TASK: {
        value: 'task',
        type: 'task assignment',
        icon: 'mingcute:task-line',
        badgeClass: 'bg-green-100 text-green-800'
   },
   PROJECT: {
        value: 'project',
        type: 'project assignment',
        icon: 'carbon:ibm-cloud-projects',
        badgeClass: 'bg-fuchsia-100 text-fuchsia-800'
   },
   SYSTEM: {
        value: 'system',
        type: 'system',
        icon: 'ic:round-system-update-alt',
        badgeClass: 'bg-purple-100 text-purple-800'
   },
   TASK_DEADLINE_ALERT: {
        value: 'task deadline alert',
        type: 'task deadline alert',
        icon: 'lucide:circle-alert',
        badgeClass: 'bg-red-100 text-red-800'
   },
   DEFAULT: {
    value: 'default',
    icon: 'iconoir:bell-notification-solid',
    badgeClass: 'bg-gray-100 text-gray-800'
   }
}

export const getNotificationTypeByValue = (value) => {
 return  Object.values(NOTIFICATION_TYPE).find(n => n.type === value?.toLowerCase()) || NOTIFICATION_TYPE.DEFAULT;
} 

export const VALID_NOTIFICATION_TYPES = Object.values(NOTIFICATION_TYPE).map(n => n.type);

export const isValidNotificationType = (type) => {
     return VALID_NOTIFICATION_TYPES.includes(type?.toLowerCase());
}
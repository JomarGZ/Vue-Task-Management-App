// src/constants/taskStatus.js
export const PROJECT_STATUS = {
    NOT_STARTED: {
        value: 'not started',
        label: 'Not Started',
        badgeClass: 'bg-gray-100 text-gray-800',
        dropdownClass: 'text-gray-700'
    },
    TO_DO: {
        value: 'to do',
        label: 'To Do',
        badgeClass: 'bg-blue-100 text-blue-800',
        dropdownClass: 'text-blue-700'
    },
    PLANNING: {
        value: 'planning',
        label: 'Planning',
        badgeClass: 'bg-purple-100 text-purple-800',
        dropdownClass: 'text-purple-700'
    },
    IN_PROGRESS: {
        value: 'in progress',
        label: 'in progress',
        badgeClass: 'bg-yellow-100 text-yellow-800',
        dropdownClass: 'text-yellow-700'
    },
    ON_HOLD: {
        value: 'on hold',
        label: 'On Hold',
        badgeClass: 'bg-orange-100 text-orange-800',
        dropdownClass: 'text-orange-700'
    },
    COMPLETED: {
        value: 'completed',
        label: 'Completed',
        badgeClass: 'bg-green-100 text-green-800',
        dropdownClass: 'text-green-700'
    },
    CANCELLED: {
        value: 'cancelled',
        label: 'Cancelled',
        badgeClass: 'bg-gray-200 text-gray-800',
        color: 'text-gray-600'
    },
    REVIEW: {
        value: 'review',
        label: 'Review',
        badgeClass: 'bg-purple-100 text-purple-800',
        color: 'text-purple-600'
    },
    TESTING: {
        value: 'testing',
        label: 'Testing',
        badgeClass: 'bg-amber-100 text-amber-800',
        color: 'text-amber-600'
    },
    DEPLOYED: {
        value: 'deployed',
        label: 'Deployed',
        badgeClass: 'bg-green-100 text-green-800',
        color: 'text-green-600'
    },
    PENDING_APPROVAL: {  
        value: 'pending approval',
        label: 'Pending Approval',
        badgeClass: 'bg-blue-100 text-blue-800',
        color: 'text-blue-600'
    },
    BACKLOG: {
        value: 'backlog',
        label: 'Backlog',
        badgeClass: 'bg-gray-100 text-gray-800',
        color: 'text-gray-500'
    },
    BLOCKED: {
        value: 'blocked',
        label: 'Blocked',
        badgeClass: 'bg-red-100 text-red-800',
        color: 'text-red-600'
    },
    REOPENED: {
        value: 'reopened',
        label: 'Reopened',
        badgeClass: 'bg-orange-100 text-orange-800',
        color: 'text-orange-600'
    },
    SCHEDULED: {
        value: 'scheduled',
        label: 'Scheduled',
        badgeClass: 'bg-indigo-100 text-indigo-800',
        color: 'text-indigo-600'
    },
    DRAFT: {
        value: 'draft',
        label: 'Draft',
        badgeClass: 'bg-slate-100 text-slate-800',
        color: 'text-slate-600 '
    },
    OVER_DUE: {
        value: 'overdue',
        label: 'OverDue',
        badgeClass: 'bg-red-100 text-red-800',
        dropdownClass: 'text-red-700'
    }
}

export const PROJECT_PRIORITY = {
    LOW: {
        value: 'low',
        label: 'Low',
        color: 'text-green-600',
        badgeClass: 'bg-green-100 text-green-800'
    },
    MEDIUM: {
        value: 'medium',
        label: 'Medium',
        color: 'text-orange-500',
        badgeClass: 'bg-orange-100 text-orange-800'
    },
    HIGH: {
        value: 'high',
        label: 'High',
        color: 'text-red-500',
        badgeClass: 'bg-red-100 text-red-800'
    },
    URGENT: {
        value: 'urgent',
        label: 'Urgent',
        color: 'text-red-700',
        badgeClass: 'bg-red-200 text-red-900'
    }
}

export const getProjectStatusOptions = () => Object.values(PROJECT_STATUS)
export const getProjectPriorityOptions = () => Object.values(PROJECT_PRIORITY);

export const getProjectStatusByValue = (value) => {
  return Object.values(PROJECT_STATUS).find(status => status.value === value) || PROJECT_STATUS.NOT_STARTED
}
export const getProjectPriorityByValue = (value) => {
  return Object.values(PROJECT_PRIORITY).find(PRIORITY => PRIORITY.value === value) || PROJECT_PRIORITY.LOW
}
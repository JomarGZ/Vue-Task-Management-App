// src/constants/taskStatus.js
export const TASK_STATUS = {
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
        label: 'In Progress',
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

export const TASK_PRIORITY = {
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

export const TASK_CATEGORY = {
  UI_UX_DESIGN: {
    value: 'ui/ux design',
    label: 'UI/UX Design',
    color: 'text-purple-700',
    icon: 'fluent:design-ideas-32-regular',     
    badgeClass: 'bg-purple-100 text-purple-900 border border-purple-200'
  },
  BACKEND_DEVELOPMENT: {
    value: 'backend development',
    label: 'Backend Development',
    color: 'text-blue-700',
    icon: 'mdi:code',        
    badgeClass: 'bg-blue-100 text-blue-900 border border-blue-200'
  },
  FRONTEND_DEVELOPMENT: {
    value: 'frontend development',
    label: 'Frontend Development',
    color: 'text-cyan-700', 
    icon: 'hugeicons:code-circle',       
    badgeClass: 'bg-cyan-100 text-cyan-900 border border-cyan-200'
  },
  FULLSTACK_DEVELOPMENT: {
    value: 'fullstack development',
    label: 'Fullstack Development',
    color: 'text-indigo-700', 
    icon: 'flowbite:laptop-code-outline',     
    badgeClass: 'bg-indigo-100 text-indigo-900 border border-indigo-200'
  },
  IOS_DEVELOPMENT: {
    value: 'ios development',
    label: 'iOS Development',
    color: 'text-gray-700', 
    icon: 'ic:baseline-apple',        
    badgeClass: 'bg-gray-100 text-gray-900 border border-gray-200'
  },
  ANDROID_DEVELOPMENT: {
    value: 'android development',
    label: 'Android Development',
    color: 'text-emerald-700', 
    icon: 'hugeicons:android',     
    badgeClass: 'bg-emerald-100 text-emerald-900 border border-emerald-200'
  },
  DEVOPS: {
    value: 'devops',
    label: 'DevOps',
    color: 'text-orange-700', 
    icon: 'carbon:ibm-devops-control',      
    badgeClass: 'bg-orange-100 text-orange-900 border border-orange-200'
  },
  QUALITY_ASSURANCE: {
    value: 'quality assurance',
    label: 'Quality Assurance',
    color: 'text-green-700',
    icon: 'solar:bug-bold',      
    badgeClass: 'bg-green-100 text-green-700 border border-green-200'
  },
  DATABASE_DESIGN: {
    value: 'database design',
    label: 'Database Design',
    color: 'text-amber-700',    
    icon: 'hugeicons:database',   
    badgeClass: 'bg-amber-100 text-amber-900 border border-amber-200'
  },
  PERFORMANCE_OPTIMIZATION: {
    value: 'performance optimization',
    label: 'Performance Optimization',
    color: 'text-pink-700',      
    icon: 'grommet-icons:document-performance',   
    badgeClass: 'bg-pink-100 text-pink-900 border border-pink-200'
  },
  TECHNICAL_DOCUMENTATION: {
    value: 'technical documentation',
    label: 'Technical Documentation',
    color: 'text-yellow-700',
    icon: 'system-uicons:document',       
    badgeClass: 'bg-yellow-100 text-yellow-900 border border-yellow-200'
  },
  OTHER: {
    value: 'other',
    label: 'Other',
    color: 'text-gray-500',
    icon: 'fluent:glance-default-12-filled',          
    badgeClass: 'bg-gray-50 text-gray-600 border border-gray-300'
  }
};

export const TASK_LINK_TYPE = {
  GOOGLE_DOCUMENT: {
    value: 'google document',
    pattern: /^https:\/\/docs\.google\.com\/document\/.*/,
    label: 'Google Document',
    placeholder: 'https://docs.google.com/document/...',
    color: 'text-blue-700',
    icon: 'catppuccin:ms-word',     
    badgeClass: 'bg-blue-100 text-blue-900 border border-blue-200'
  },
  GOOGLE_SLIDE: {
    value: 'google slide',
    pattern: /^https:\/\/docs\.google\.com\/presentation\/.*/,
    label: 'Google Slide',
    placeholder: 'https://docs.google.com/presentation/...',
    color: 'text-yellow-700',
    icon: 'logos:slides',     
    badgeClass: 'bg-yellow-100 text-yellow-900 border border-yellow-200'
  },
  GITHUB_PR_ISSUE: {
    value: 'github pr/issue',
    pattern: /^https:\/\/github\.com\/[^/]+\/[^/]+\/(pull|pulls|issue)\/\d+/,
    label: 'GitHub PR/Issue',
    placeholder: 'https://github.com/user/repo/pull/00',
    color: 'text-gray-700',
    icon: 'skill-icons:github-dark',     
    badgeClass: 'bg-gray-100 text-gray-900 border border-gray-200'
  },
  FIGMA_DESIGN: {
    value: 'figma design',
    pattern: /^https:\/\/(www\.)?figma\.com\/(file|design)\/[a-zA-Z0-9_-]+(\/.*)?/,
    label: 'Figma Design',
    placeholder: 'https://www.figma.com/design/...',
    color: 'text-slate-700',
    icon: 'material-icon-theme:figma',     
    badgeClass: 'bg-slate-100 text-slate-900 border border-slate-200'
  },
}

export const getTaskStatusOptions = () => Object.values(TASK_STATUS);
export const getTaskPriorityOptions = () => Object.values(TASK_PRIORITY);
export const getTaskCategoryOptions = () => Object.values(TASK_CATEGORY);
export const getTaskLinkTypeOptions = () => Object.values(TASK_LINK_TYPE);

export const getTaskLinkTypeValue = (value) => {
  return Object.values(TASK_LINK_TYPE).find(type => type.value === value) || TASK_LINK_TYPE.OTHER
}
export const getTaskStatusByValue = (value) => {
  return Object.values(TASK_STATUS).find(status => status.value === value) || TASK_STATUS.NOT_STARTED
}
export const getTaskPriorityByValue = (value) => {
  return Object.values(TASK_PRIORITY).find(PRIORITY => PRIORITY.value === value) || TASK_PRIORITY.LOW
}
export const getTaskCategoryByValue = (value) => {
    return Object.values(TASK_CATEGORY).find(category => category.value === value) || TASK_CATEGORY.OTHER
}

export const VALID_TASK_LINKS = Object.values(TASK_LINK_TYPE).map(
  type => type.value
);

export const VALID_TASK_CATEGORIES = Object.values(TASK_CATEGORY).map(
    category => category.value
);
export const VALID_TASK_STATUS = Object.values(TASK_STATUS).map(
    status => status.value
);
export const VALID_TASK_PRIORITY = Object.values(TASK_PRIORITY).map(
    priority => priority.value
);
export const USER_POSITION = {
    FRONTEND_WEB_DEVELOPER: {
        value: 'frontend web developer',
        label: ' Frontend Web Developer',
        badgeClass: 'bg-blue-100 text-blue-800'
    },
    BACKEND_WEB_DEVELOPER: {
        value: 'backend web developer',
        label: ' Backend Web Developer',
        badgeClass: 'text-purple-800 bg-purple-100'
    },
    FULLSTACK_WEB_DEVELOPER: {
        value: 'fullstack web developer',
        label: ' Fullstack Web Developer',
        badgeClass: 'text-indigo-800 bg-indigo-100'
    },
    IOS_DEVELOPER: {
        value: 'ios developer',
        label: ' IOS Developer',
        badgeClass: 'bg-gray-100 text-gray-800'
    },
    ANDROID_DEVELOPER: {
        value: 'android developer',
        label: ' Android Developer',
        badgeClass: 'text-green-800 bg-green-100'
    },
    UI_UX_DESIGNER: {
        value: 'ui/ux designer',
        label: ' UI/UX Designer',
        badgeClass: 'bg-pink-100 text-pink-800'
    },
    QA_TESTER: {
        value: 'qa tester',
        label: ' QA Tester',
        badgeClass: 'bg-yellow-100 text-yellow-800'
    },
    PROJECT_MANAGER: {
        value: 'project manager',
        label: ' Project Manager',
        badgeClass: 'bg-red-100 text-red-800'
    },
    BRIDGE_ENGINEER: {
        value: 'bridge engineer',
        label: ' Bridge Engineer',
        badgeClass: 'text-cyan-800 bg-cyan-100'
    },
}

export const getPositionsOption = () => Object.values(USER_POSITION)
export const getPositionByValue = (value) => {
    return Object.values(USER_POSITION).find(v => v.value === value);
}
export const VALID_POSITIONS = Object.values(USER_POSITION).map(
    p => p.value
)
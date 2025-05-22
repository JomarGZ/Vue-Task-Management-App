export const USER_POSITION = {
    FRONTEND_WEB_DEVELOPER: {
        value: 'frontend web developer',
        label: ' Frontend Web Developer'
    },
    BACKEND_WEB_DEVELOPER: {
        value: 'backend web developer',
        label: ' Backend Web Developer'
    },
    FULLSTACK_WEB_DEVELOPER: {
        value: 'fullstack web developer',
        label: ' Fullstack Web Developer'
    },
    IOS_DEVELOPER: {
        value: 'ios developer',
        label: ' IOS Developer'
    },
    ANDROID_DEVELOPER: {
        value: 'android developer',
        label: ' Android Developer'
    },
    UI_UX_DESIGNER: {
        value: 'ui/ux designer',
        label: ' UI/UX Designer'
    },
    QA_TESTER: {
        value: 'qa tester',
        label: ' QA Tester'
    },
    PROJECT_MANAGER: {
        value: 'project manager',
        label: ' Project Manager'
    },
    BRIDGE_ENGINEER: {
        value: 'bridge engineer',
        label: ' Bridge Engineer'
    },
}

export const getPositionsOption = () => Object.values(USER_POSITION)

export const VALID_POSITIONS = Object.values(USER_POSITION).map(
    p => p.value
)
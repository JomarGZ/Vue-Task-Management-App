<template>
     <div>
        <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full shadow-sm" alt="User avatar"/>
        <form @submit.prevent="" class="flex-grow">

            <div class="bg-gray-50 rounded-2xl p-4">
                <!-- <span  class="text-sm text-gray-600"><button type="button" class="text-blue-500 hover:text-blue-700">Cancel</button> editing</span> -->
                <textarea 
                    class="w-full bg-transparent border-0 focus:outline-none focus:ring-0 p-0 scrollbar-hide resize-none text-gray-700 placeholder-gray-400"
                    rows="2"
                    ref="textareaRef"
                    placeholder="Add your comment..."
                ></textarea>
                <div class="flex items-center justify-between mt-1 pt-1 border-gray-200">
                    <div class="flex gap-2">
                        <button type="button" class="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                        </button>
                        <button type="button" class="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <button
                      type="submit"
                      :class="[
                        'px-4 py-2 text-blue rounded-full  transition-colors',
                        true ? 'hover:bg-gray-200' : ''

                        ]">
                        <IconSVG name="send-solid-svg" class="text-blue-700"/>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
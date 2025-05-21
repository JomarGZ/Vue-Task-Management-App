<template>
  <div class="relative">
    <div
      ref="contentRef"
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :style="isExpanded ? '' : `max-height: ${maxHeight}`"
    >
      <slot />
    </div>
    <button
      v-if="showToggle && needsExpand"
      @click="toggleExpanded"
      class="mt-2 text-blue-500 hover:text-blue-700 hover:underline text-sm font-medium focus:outline-none"
    >
      {{ isExpanded ? 'Read Less' : 'Read More' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  maxHeight: {
    type: String,
    default: '100px'
  },
  expanded: {
    type: Boolean,
    default: false
  }
})

const contentRef = ref(null)
const isExpanded = ref(props.expanded)
const showToggle = ref(false)
const needsExpand = ref(false)

const checkOverflow = () => {
  nextTick(() => {
    if (contentRef.value) {
      const prevMaxHeight = contentRef.value.style.maxHeight
      contentRef.value.style.maxHeight = 'none'
      const fullHeight = contentRef.value.scrollHeight
      contentRef.value.style.maxHeight = prevMaxHeight

      const currentMaxHeight = parseFloat(props.maxHeight) || 100
      const unit = props.maxHeight.replace(/[0-9.]/g, '') || 'px'
      const maxHeightPx = unit === 'px' 
        ? currentMaxHeight
        : convertToPx(currentMaxHeight, unit)
      
      needsExpand.value = fullHeight > maxHeightPx
      showToggle.value = true 
    }
  })
}

const convertToPx = (value, unit) => {
  if (unit === 'rem') return value * 16
  if (unit === 'em') return value * 16
  return value
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  checkOverflow()
  window.addEventListener('resize', checkOverflow)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkOverflow)
})
</script>
<script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: 'Loading ..' // Default value for the 'message' prop
    }
  })
</script>

<template>
  <div class="flex justify-center">
    <div class="core-progress-loading-span">
      <div class="ico">
        <svg id="Guidelines" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs></defs><path class="cls-1" d="M267.48,382.92a130,130,0,0,1-19-1.41L238,379.94,241.13,359l10.45,1.57A105.76,105.76,0,1,0,184,321.26l6.52,8.32-16.63,13-6.52-8.32a125.72,125.72,0,0,1-25.65-97.06C152,168,216.77,120.15,286,130.48a126.92,126.92,0,0,1-18.48,252.44Z"/><polygon class="cls-1" points="179.34 347.4 117.86 328.34 124.11 308.15 175.51 324.08 191.01 274.08 211.2 280.34 192.57 340.44 179.34 347.4"/></svg>
      </div>
      <div class="text">
        {{text}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .core-progress-loading-span {
    display: flex;
    justify-content: center;
    .ico {
      svg {
        width: 50px;
        fill: rgba(0,0,0,0.4);
        animation: rotateAnimation 2s linear infinite;
      }
    }
    .text {
      padding-top: 12px;
    }
  }

  @keyframes rotateAnimation {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
</style>
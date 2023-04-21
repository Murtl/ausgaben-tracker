<script setup lang="ts">
import { computed } from 'vue'
import dynamicText from '@/text/dynamicText.json'

export interface Props {
  /**
   * The title of the welcome form
   */
  title: string

  /**
   * The height of the welcome form
   */
  height: string
}

const props = withDefaults(defineProps<Props>(), {})

const computedMainHeight = computed(() => (props.height === '520px' ? '365px' : '455px'))
</script>

<template>
  <div class="at-welcome-form-host">
    <header>
      <p class="caption">{{ dynamicText.expenditures_tracker }}</p>
      <p class="lower-caption">{{ dynamicText.created_by_Mertl }}</p>
    </header>

    <main>
      <section class="title">
        {{ title }}
      </section>

      <section class="input">
        <slot name="inputs"></slot>
      </section>

      <section class="button">
        <slot name="buttons"></slot>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/welcome-form/atWelcomeForm.scss';
.at-welcome-form-host {
  height: v-bind(height);
  main {
    height: v-bind(computedMainHeight);
  }
}
</style>

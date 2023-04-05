<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  title: string
  height: string
}

const props = withDefaults(defineProps<Props>(), {})

const computedMainHeight = computed(() => (props.height === '650px' ? '450px' : '550px'))
</script>

<template>
  <div class="at-welcome-form-host">
    <header>
      <p class="caption">Ausgaben Tracker</p>
      <p class="lower-caption">erstellt von Mertl</p>
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
@import 'src/assets/base.scss';
.at-welcome-form-host {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: v-bind(height);
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: auto;
  margin-top: 150px;

  header {
    width: 600px;
    height: 175px;
    background: $main-blue;
    border-radius: 10px 10px 0px 0px;

    .caption {
      font-style: normal;
      font-weight: 600;
      font-size: 50px;
      text-align: center;
      color: $text-white;
      margin-bottom: 10px;
      margin-top: 30px;
    }

    .lower-caption {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      color: $text-white;
      opacity: 0.7;
      margin-left: 105px;
    }
  }

  main {
    width: 600px;
    height: v-bind(computedMainHeight);

    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 35px;
      line-height: 125.3%;
      color: $heading-text-light;
      margin-left: 50px;
      margin-top: 40px;
      margin-bottom: 30px;
    }

    .input {
      margin-left: 50px;
    }

    .button {
      margin-left: 50px;
      margin-top: 50px !important;
    }
  }
}
</style>

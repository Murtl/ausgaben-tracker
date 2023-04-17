<script setup lang="ts">
import ATButton from '../button/ATButton.vue'
import ATOpenEyeIcon from '../icons/ATOpenEyeIcon.vue'
import ATClosedEyeIcon from '../icons/ATClosedEyeIcon.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface Props {
  /**
   * The title of the input
   */
  title: string

  /**
   * The value of the input
   */
  value?: string | number

  /**
   * Whether the input is type password
   */
  password?: boolean

  /**
   * Whether the input is readonly
   */
  readonly?: boolean

  /**
   * The placeholder of the input
   */
  placeholder?: string

  /**
   * Whether the input is type date
   */
  typeDate?: boolean

  /**
   * Whether the input is type month
   */
  typeMonth?: boolean

  /**
   * Whether the input is type year
   */
  typeYear?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  password: false,
  value: '',
  readonly: false,
  placeholder: '',
  typeDate: false,
  typeMonth: false,
  typeYear: false
})

interface Emits {
  /**
   * Emitted when the input value changes
   */
  (e: 'update:value', value: string | number | object): void
}

const emit = defineEmits<Emits>()

const inputValue: Ref<string | number | object | undefined> = ref(props.value)
const computedType = ref(
  props.typeDate
    ? 'date'
    : props.password
    ? 'password'
    : typeof props.value === 'number'
    ? 'number'
    : 'text'
)
const computedWitdth = computed(() => (props.password ? '350px' : '400px'))
const computedMin = computed(() => {
  if (props.typeMonth) {
    return '1'
  }
  if (props.typeYear) {
    return '1900'
  }
  return undefined
})
const computedMax = computed(() => {
  if (props.typeMonth) {
    return '12'
  }
  if (props.typeYear) {
    return '2100'
  }
  return undefined
})

onBeforeMount(() => {
  if (props.value === 0) {
    inputValue.value = undefined
  }
  if (props.typeDate && props.value && typeof props.value === 'string') {
    inputValue.value = props.value.split('.').reverse().join('-')
  }
})

watch(
  () => props.value,
  (newValue) => {
    if (newValue) {
      if (props.typeDate && newValue && typeof newValue === 'string') {
        inputValue.value = newValue.split('.').reverse().join('-')
      } else {
        inputValue.value = newValue
      }
    }
  }
)

watch(inputValue, (newValue: string | number | object) => {
  if (props.typeDate) {
    emit('update:value', newValue.toString().split('-').reverse().join('.'))
  } else {
    emit('update:value', newValue)
  }
})

const showPassword = () => {
  computedType.value = 'text'
}
const hidePassword = () => {
  computedType.value = 'password'
}
</script>

<template>
  <div class="at-input-host">
    <div class="title">
      {{ title }}
    </div>
    <div class="input-field">
      <input
        class="native-input-element"
        :type="computedType"
        v-model="inputValue"
        :min="computedMin"
        :max="computedMax"
        step="1"
        :placeholder="placeholder"
        :readonly="readonly"
        :class="{ readonly }"
      />
      <ATButton
        width="50px"
        v-if="password && computedType === 'password'"
        tertiary
        class="button"
        :class="{ readonly }"
        @click="showPassword"
      >
        <template #icon>
          <ATOpenEyeIcon />
        </template>
      </ATButton>
      <ATButton
        width="50px"
        v-if="password && computedType === 'text'"
        tertiary
        class="button"
        :class="{ readonly }"
        @click="hidePassword"
      >
        <template #icon>
          <ATClosedEyeIcon />
        </template>
      </ATButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';

.at-input-host {
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;

  .title {
    color: #616d7c;
    font-size: $second-font-size;
  }

  .input-field {
    display: flex;
    flex-flow: row;
    background-color: $background-white-input;
    border-radius: 5px;
    width: 400px;

    .native-input-element {
      border: none;
      cursor: pointer;
      height: 50px;
      border-radius: 5px;
      font-size: $second-font-size;
      background-color: $background-white-input;
      width: v-bind(computedWitdth);
      padding: 8px 14px;
      box-sizing: border-box;

      &.readonly {
        cursor: unset;
        background-color: $background-white;
      }
    }

    .native-input-element:focus {
      outline: none;
    }

    .button {
      background-color: $background-white-input;
      align-items: center;
      height: 50px;
      justify-content: center;
      width: 50px;
      margin-bottom: 0px;

      &.readonly {
        background-color: $background-white;
      }
    }
  }
}
</style>

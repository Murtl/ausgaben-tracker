<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue'
import ATOpenEyeIcon from '@/components/icons/ATOpenEyeIcon.vue'
import ATClosedEyeIcon from '@/components/icons/ATClosedEyeIcon.vue'
import { computed, ref, watch } from 'vue'

export interface Props {
  title: string
  value?: string
  password?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  password: false,
  value: ''
})

interface Emits {
  (e: 'update:value', value: string): void
}

const emit = defineEmits<Emits>()

const inputValue = ref(props.value);
const computedType = ref(props.password ? 'password' : 'text')
const computedWitdth = computed(() => (props.password ? '266px' : '316px'))

const showPassword = () => {
  computedType.value = 'text'
}
const hidePassword = () => {
  computedType.value = 'password'
}

watch(inputValue, (newValue) => {
  emit('update:value', newValue)
});

</script>

<template>
  <div class="at-input-host">
    <div class="title">
      {{ title }}
    </div>
    <div class="input-field">
      <input class="native-input-element" :type="computedType" v-model="inputValue"/>
      <ATButton width="50px" v-if="password && computedType === 'password'" tertiary class="button" @click="showPassword">
        <template #icon>
          <ATOpenEyeIcon />
        </template>
      </ATButton>
      <ATButton width="50px" v-if="password && computedType === 'text'" tertiary class="button" @click="hidePassword">
        <template #icon>
          <ATClosedEyeIcon />
        </template>
      </ATButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/base.scss';

.at-input-host {
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;
  user-select: none;

  .title {
    color: #616d7c;
    font-size: 14px;
  }

  .input-field {
    display: flex;
    flex-flow: row;
    background-color: #e9ecf0;
    border-radius: 5px;
    width: 316px;
    .native-input-element {
      border: none;
      cursor: pointer;
      height: 36px;
      border-radius: 5px;
      background-color: #e9ecf0;
      width: v-bind(computedWitdth);
      padding: 8px 14px;
      box-sizing: border-box;
    }

    .native-input-element:focus {
      outline: none;
    }

    .button {
        background-color: #e9ecf0;
      align-items: center;
      height: 36px;
      justify-content: center;
      width: 50px;
      margin-bottom: 0px;
    }
  }
}
</style>

<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue';
import ATInput from '@/components/input/ATInput.vue';
import ATWelcomeForm from '@/components/welcome-form/ATWelcomeForm.vue';
import {ref} from 'vue'

const inputValue = ref('');
const inputPwValue = ref('');
const handlePress = () => {
    console.log('pressed');
    console.log(inputValue.value)
    console.log(inputPwValue.value);
}

</script>

<template>
    <div class="at-login-host">
        <ATWelcomeForm title="Login" height="800px">
            <template #inputs>
                <ATInput title="E-Mail" value="nix" v-model:value="inputValue"/>
                <ATInput title="Passwort" value="nix" v-model:value="inputPwValue" password/>
            </template>
            <template #buttons>
                <ATButton title="Login" width="485px" primary @press="handlePress"/>
                <ATButton title="Neu hier?" width="485px" secondary @press="handlePress"/>
            </template>
        </ATWelcomeForm>
    </div>
</template>

<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue';
import ATInput from '@/components/input/ATInput.vue';
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
        <h1>Login</h1>
        <ATInput title="E-Mail" value="nix" v-model:value="inputValue"/>
        <ATInput title="Passwort" value="nix" v-model:value="inputPwValue" password/>
        <ATButton title="Login" width="316px" primary @press="handlePress"/>
        <ATButton title="Neu hier?" width="316px" secondary @press="handlePress"/>
    </div>
</template>

<style scoped lang="scss">
.at-login-host {
    h1{
        color:red;
    }
}
</style>
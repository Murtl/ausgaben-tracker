<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue';
import ATInput from '@/components/input/ATInput.vue';
import ATWelcomeForm from '@/components/welcome-form/ATWelcomeForm.vue';
import {ref} from 'vue'

const inputValue = ref('');
const inputPwValue = ref('');
const inputPWValue2 = ref('');
const handlePress = () => {
    console.log('pressed');
    console.log(inputValue.value)
    console.log(inputPwValue.value);
    console.log(inputPWValue2.value);
}

</script>

<template>
    <div class="at-login-host">
        <ATWelcomeForm title="Registrieren" height="850px">
            <template #inputs>
                <ATInput title="E-Mail" value="nix" v-model:value="inputValue"/>
                <ATInput title="Passwort" value="nix" v-model:value="inputPwValue" password/>
                <ATInput title="Passwort bestätigen" value="nix" v-model:value="inputPwValue" password/>
            </template>
            <template #buttons>
                <ATButton title="Registrieren" width="485px" primary @press="handlePress"/>
                <ATButton title="Bereits einen Account?" width="485px" secondary @press="handlePress"/>
            </template>
        </ATWelcomeForm>
    </div>
</template>

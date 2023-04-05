<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue';
import ATInput from '@/components/input/ATInput.vue';
import ATWelcomeForm from '@/components/welcome-form/ATWelcomeForm.vue';
import {ref} from 'vue'
import { useLoggedInStore } from '../stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATLogin from './ATLogin.vue';

const loggedInStore = useLoggedInStore();
const { loggedIn } = storeToRefs(loggedInStore)

const inputValue = ref('');
const inputPwValue = ref('');
const inputPWValue2 = ref('');
const handlePress = () => {
    loggedIn.value = true;
}


const showLogin = ref(false);
const handlePressLogin = () => {
    showLogin.value = true;
}

</script>

<template>
    <div class="at-login-host" v-if="!showLogin">
        <ATWelcomeForm title="Registrieren" height="850px">
            <template #inputs>
                <ATInput title="E-Mail" value="nix" v-model:value="inputValue"/>
                <ATInput title="Passwort" value="nix" v-model:value="inputPwValue" password/>
                <ATInput title="Passwort bestätigen" value="nix" v-model:value="inputPWValue2" password/>
            </template>
            <template #buttons>
                <ATButton title="Registrieren" width="485px" primary @press="handlePress"/>
                <ATButton title="Bereits einen Account?" width="485px" secondary @press="handlePressLogin"/>
            </template>
        </ATWelcomeForm>
    </div>
    <ATLogin v-else/>
</template>

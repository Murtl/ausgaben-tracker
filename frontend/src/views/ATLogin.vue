<script setup lang="ts">
import ATButtonVue from '@/components/button/ATButton.vue';
import ATCheckIcon from '@/components/icons/ATCheckIcon.vue';

const handlePress = () => {
    console.log('pressed');
}
</script>

<template>
    <div class="at-login-host">
        <h1>Login</h1>
        <ATButtonVue title="Login" width="316px" primary @press="handlePress"/>
        <ATButtonVue title="Neu hier?" width="316px" secondary @press="handlePress"/>
        <ATButtonVue title="Löschen..." width="316px" tertiary @press="handlePress"/>
        <ATButtonVue title="Mit Icon" width="316px" primary @press="handlePress">
            <template #icon>
                <ATCheckIcon/>
            </template>
        </ATButtonVue>
    </div>
</template>

<style scoped lang="scss">
.at-login-host {
    h1{
        color:red;
    }
}
</style>
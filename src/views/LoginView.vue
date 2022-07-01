<script setup>
import router from "../router";
import CommonForm from "../components/CommonForm.vue";
import { useUserStore } from "../stores/user";

const store = useUserStore();

async function login(values) {
  try {
    await store.logIn(values);
    router.replace({ name: "home" });
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="full__view">
    <CommonForm
      title="Login"
      linkText="Not a member? Sign up"
      link="signup"
      @functionSubmit="(values) => login(values)"
    />
  </div>
</template>

<style scoped></style>

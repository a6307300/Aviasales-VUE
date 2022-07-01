<script setup>
import router from "../router";
import CommonForm from "../components/CommonForm.vue";
import { useUserStore } from "../stores/user";

const store = useUserStore();

async function signup(values) {
  try {
    await store.signUp(values);
    router.replace({ name: "home" });
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="full__view">
    <CommonForm
      title="Sign up"
      linkText="Already a member? Log in"
      link="login"
      @functionSubmit="(values) => signup(values)"
    />
  </div>
</template>

<style scoped></style>

<script setup>
import { useForm, Field } from "vee-validate";
import * as yup from "yup";
import YupPassword from "yup-password";

import ModalSimple from "./ModalSimple.vue";
import router from "../router";
import ButtonLink from "./ButtonLink.vue";

const props = defineProps({
  title: String,
  linkText: String,
  link: String,
});

const emit = defineEmits(["functionSubmit"]);

function redirect() {
  router.replace({ name: props.link });
}

YupPassword(yup);
const { handleSubmit, errors } = useForm({
  validationSchema: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().password(),
  }),
});
const onSubmit = handleSubmit(async (values) => {
  try {
    emit("functionSubmit", values);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <ModalSimple />
  <form class="form" @submit="onSubmit">
    <div class="form__header">
      <img class="form__logo" src="/Logo.png" />
      {{ title }}
    </div>
    <div class="form__body">
      <Field name="email" class="form__input" placeholder="Email" />
      <span class="form__input--error">{{ errors.email }}</span>
      <Field
        name="password"
        class="form__input"
        placeholder="Password"
        type="password"
      />
      <span class="form__input--error">{{ errors.password }}</span>
    </div>
    <button class="form__button" type="submit">{{ title }}</button>
    <div class="form__link">
      <ButtonLink
        :style="{ 'background-color': 'white' }"
        @click.prevent="redirect"
      >
        {{ linkText }}
      </ButtonLink>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.form {
  @extend %rounded-shadowed;
  max-width: 400px;
  margin-top: 20px;
  &__header {
    @extend %display-center;
    @extend %headers-font;
    font-size: 20px;
    margin: 10px 0 20px 0;
  }
  &__body {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .form__input {
    @extend %clean-input;
    min-height: 20px;
    width: 250px;
    margin: 5px 40px;
    border-bottom: 1px solid $primary-color-lighter;

    &--error {
      @extend %display-center;
      min-height: 16px;
      color: red;
    }
  }
  &__button {
    @extend %active-button;
    height: 40px;
    width: 80%;
    margin: 0 40px 30px 40px;
  }
  &__link {
    @extend %display-center;
    margin-bottom: 20px;
  }
}
</style>

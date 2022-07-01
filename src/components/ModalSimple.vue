<script setup>
import { useUserStore } from "../stores/user";
const store = useUserStore();
</script>

<template>
  <Teleport to="body">
    <Transition name="bounce">
      <div v-if="store.isPasswordWrong" class="modal">
        <div class="modal__container">
          <p>{{ store.errorMessage }}</p>
          <button class="modal__button" @click="store.isPasswordWrong = false">
            Close
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.modal {
  @extend %display-center;
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(33, 150, 243, 0.5);
  &__container {
    @extend %rounded-shadowed;
    @extend %display-center;
    background-color: white;
    padding-bottom: 15px;
    text-transform: uppercase;
    font-weight: 600;
    width: 260px;
    padding: 20px;
    text-align: center;
  }
  &__button {
    @extend %active-button;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

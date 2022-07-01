<script setup>
import { ref, computed } from "vue";
import router from "../router";
import FilterStops from "./FilterStops.vue";
import TicketItem from "./TicketItem.vue";
import ButtonLink from "./ButtonLink.vue";

const props = defineProps({
  tickets: Array,
  sort: String,
  isAllShown: Boolean,
});

const emit = defineEmits(["handleSortClick", "handleClickAdd", "setFilters"]);

const buttons = [
  {
    label: "Самый дешевый",
    selector: "cheap",
    extraClass: "left-button",
  },
  {
    label: "Самый быстрый",
    selector: "fast",
  },
  {
    label: "Оптимальный",
    selector: "optimal",
    extraClass: "right-button",
  },
];

const widthScreen = ref(window.screen.width);

window.addEventListener("resize", () => {
  widthScreen.value = document.documentElement.clientWidth;
});

const isBig = computed(() => widthScreen.value > 780);

const isSmall = computed(() => widthScreen.value < 520);

function redirect() {
  localStorage.clear();
  router.replace({ name: "logout" });
}

function setFiltersNew(valueArr) {
  emit("setFilters", valueArr);
}
</script>

<template>
  <div class="tickets">
    <div class="tickets__logout">
      <ButtonLink @click="redirect" :style="{ 'background-color': '#F3F7FA' }">
        Log out
      </ButtonLink>
    </div>
    <div class="tickets__header">
      <img class="header__logo" src="/Logo.png" />
    </div>
    <div class="tickets__body">
      <FilterStops v-if="isBig" :isBig="isBig" @setFiltersNew="setFiltersNew" />
      <div class="tickets__list">
        <div class="tickets__sort">
          <button
            v-for="button in buttons"
            :key="button.label"
            class="tickets__sort__button"
            :class="{
              'sort-active': sort === button.selector,
              [button.extraClass]: true,
            }"
            @click="emit('handleSortClick', button.selector)"
          >
            {{ button.label }}
          </button>
        </div>
        <FilterStops
          v-if="!isBig"
          :isBig="isBig"
          @setFiltersNew="setFiltersNew"
        />
        <TicketItem
          v-for="ticket in tickets"
          :key="ticket.createdAt + Math.random()"
          :ticketItem="ticket"
          :isSmall="isSmall"
        />
        <button
          v-if="!isAllShown"
          class="tickets__button"
          @click="emit('handleClickAdd')"
        >
          Показать еще 5 билетов
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.tickets__header {
  @extend %display-center;
  height: 135px;
}
.header__logo {
  width: 60px;
  height: 60px;
}
.tickets__body {
  display: flex;
  column-gap: 20px;

  .tickets__list {
    @extend %display-center;
    row-gap: 20px;

    .tickets__button {
      @extend %active-button;
      width: 100%;
      min-height: 40px;
      margin-bottom: 30px;
    }
  }
}
.tickets__sort {
  @extend %rounded-shadowed;
  @extend %display-space-between;
  width: 100%;
  &__button {
    @extend %clean-input;
    width: 33.3%;
    min-height: 50px;
    background-color: white;
    border-radius: 0;
    text-transform: uppercase;
    color: $primary-color;
    font-weight: 600;
    font-size: 12px;
    word-break: break-word;
  }
}
.sort-active {
  background-color: $highlight-color;
  color: white;
}
.left-button {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.right-button {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.tickets__logout {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>

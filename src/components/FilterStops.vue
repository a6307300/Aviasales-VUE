<script setup>
import { ref } from "vue";

const props = defineProps({
  isBig: Boolean,
});

const emit = defineEmits(["setFiltersNew"]);

const stops = ref([
  {
    selected: true,
    label: "Все",
    number: 100,
  },
  {
    selected: false,
    label: "Без пересадок",
    number: 0,
  },
  {
    selected: false,
    label: "1 пересадка",
    number: 1,
  },
  {
    selected: false,
    label: "2 пересадки",
    number: 2,
  },
  {
    selected: false,
    label: "3 пересадки",
    number: 3,
  },
]);

function setFilters() {
  const valueArr = stops.value.filter(
    (item) => item.selected && !stops.value[0].selected
  );
  emit("setFiltersNew", valueArr);
}
</script>

<template>
  <div :class="{ 'filter-stops': true, 'filter-stops--small': !isBig }">
    <div v-if="isBig" class="filter-stops__header">Количество пересадок</div>
    <div
      :class="{ 'filter-stops__stop': true, 'stop--small': !isBig }"
      v-for="stop in stops"
      :key="stop?.label"
    >
      <input
        class="stop__selector"
        type="checkbox"
        v-model="stop.selected"
        @change="setFilters"
      />
      {{ stop?.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.filter-stops {
  @extend %rounded-shadowed;
  width: 232px;
  max-height: 290px;
  &__header {
    @extend %display-center;
    @extend %headers-font;
    width: 100%;
    min-height: 52px;
  }
  &__stop {
    display: flex;
    align-items: center;
    min-height: 20px;
    padding: 10px 5px 10px 20px;
    font-size: 13px;
    cursor: default;
  }
  .filter-stops__stop:hover {
    background-color: $highlight-background;
  }
  .stop__selector {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.filter-stops--small {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.stop--small {
  padding: 10px 5px;
  font-size: 10px;
}
</style>

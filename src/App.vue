<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />
    <!-- Temperature selection -->
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>

    <!-- Ingredient selections -->
    <div style="display: grid; gap: 8px; margin: 12px 0;">
      <label>
        Base:
        <select v-model="beverageStore.currentBaseId">
          <option v-for="b in beverageStore.bases" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </label>
      <label>
        Creamer:
        <select v-model="beverageStore.currentCreamerId">
          <option v-for="c in beverageStore.creamers" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </label>
      <label>
        Syrup:
        <select v-model="beverageStore.currentSyrupId">
          <option v-for="s in beverageStore.syrups" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </label>
    </div>

    <!-- Naming and create -->
    <input type="text" placeholder="Name" v-model="beverageStore.newName" />
    <button @click="beverageStore.makeBeverage">🍺 Make Beverage</button>
  </div>
  <div id="beverage-container" style="margin-top: 20px">
    <div v-if="beverageStore.recipes.length === 0">No saved beverages yet.</div>
    <ul v-else style="list-style: none; padding: 0;">
      <li v-for="r in beverageStore.recipes" :key="r.id" style="margin: 4px 0;">
        <label>
          <input
            type="radio"
            name="saved-beverage"
            :value="r.id"
            v-model="beverageStore.selectedRecipeId"
            @change="beverageStore.showBeverage(r.id)"
          />
          {{ r.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
const beverageStore = useBeverageStore();
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>

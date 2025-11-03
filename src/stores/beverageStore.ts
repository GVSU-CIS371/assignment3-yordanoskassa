import { defineStore } from "pinia";
import { computed, ref } from "vue";
import temps from "../data/tempretures.json";
import bases from "../data/bases.json";
import creamers from "../data/creamers.json";
import syrups from "../data/syrups.json";
import type {
  BeverageType,
  BaseBeverageType,
  CreamerType,
  SyrupType,
} from "../types/beverage";

export const useBeverageStore = defineStore("BeverageStore", () => {
  // options
  const tempsList = temps as unknown as string[];
  const basesList = bases as unknown as BaseBeverageType[];
  const creamersList = creamers as unknown as CreamerType[];
  const syrupsList = syrups as unknown as SyrupType[];

  // selections
  const currentTemp = ref<string>(tempsList[0]);
  const currentBaseId = ref<string>(basesList[0]?.id ?? "");
  const currentCreamerId = ref<string>(creamersList[0]?.id ?? "");
  const currentSyrupId = ref<string>(syrupsList[0]?.id ?? "");

  // naming
  const newName = ref<string>("");

  // recipes
  const recipes = ref<BeverageType[]>([]);
  const selectedRecipeId = ref<string>("");

  // derived
  const currentBase = computed(() =>
    basesList.find((b) => b.id === currentBaseId.value) ?? basesList[0]
  );
  const currentCreamer = computed(() =>
    creamersList.find((c) => c.id === currentCreamerId.value) ?? creamersList[0]
  );
  const currentSyrup = computed(() =>
    syrupsList.find((s) => s.id === currentSyrupId.value) ?? syrupsList[0]
  );

  // actions
  function makeBeverage() {
    const name = newName.value.trim() || `Beverage ${recipes.value.length + 1}`;
    const id = `${Date.now()}`;
    const recipe: BeverageType = {
      id,
      name,
      temp: currentTemp.value,
      base: currentBase.value,
      syrup: currentSyrup.value,
      creamer: currentCreamer.value,
    };
    recipes.value.push(recipe);
    selectedRecipeId.value = id;
    newName.value = "";
  }

  function showBeverage(id: string) {
    const found = recipes.value.find((r) => r.id === id);
    if (!found) return;
    selectedRecipeId.value = id;
    currentTemp.value = found.temp;
    currentBaseId.value = found.base.id;
    currentCreamerId.value = found.creamer.id;
    currentSyrupId.value = found.syrup.id;
  }

  return {
    // options
    temps: tempsList,
    bases: basesList,
    creamers: creamersList,
    syrups: syrupsList,
    // selections
    currentTemp,
    currentBaseId,
    currentCreamerId,
    currentSyrupId,
    // derived
    currentBase,
    currentCreamer,
    currentSyrup,
    // naming + recipes
    newName,
    recipes,
    selectedRecipeId,
    // actions
    makeBeverage,
    showBeverage,
  };
}, { persist: true });

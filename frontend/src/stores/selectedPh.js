import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSelectedPh = defineStore('selectedPhId', () => {
  const selectedPhId = ref()
  watch(selectedPhId, changeSelectedPhId)
  function changeSelectedPhId(newId) {
    selectedPhId.value = newId;
  }

  // expose anything you need
  return { selectedPhId }
})
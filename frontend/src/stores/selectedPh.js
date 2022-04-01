import { defineStore } from 'pinia';
// import { ref, watch } from 'vue';

// export const useSelectedPh = defineStore('selectedPhId', () => {
//   const selectedPhId = ref()
//   watch(selectedPhId, changeSelectedPhId)
//   function changeSelectedPhId(newId) {
//     selectedPhId.value = newId;
//   }

//   // expose anything you need
//   return { selectedPhId }
// })

export const useSelectedPhId = defineStore({
  id: 'selectedPhId',
  state: () => ({
    id: ''
  }),
  getters: {
  },
  actions: {
    update(id) {
      // console.log(id);
      this.id = id;
    }
  }
})
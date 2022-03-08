<script>
const state = [
  {mode: 'isShow', buttonNext: 'Edit'},
  {mode: 'isEditing', buttonNext: 'Confirm'},
  {mode: 'isConfirming', buttonNext: 'Submit'},
]
export default {
  name: 'PhilosopherConfirm',
  props:['id'],
  data(){
    return {
      philosopher: {
        name: 'Leibniz',
      },
      philosopherForm: {
        name: 'Leibniz',
      },
      mode: 'isShow',
      next: 'Edit',
    }
  },
  methods: {
    toNextState(thisMode){
      let index = state.findIndex(({mode}) => mode === thisMode)
      if(index === 2) index = -1;
      this.mode = state[index+1].mode;
      this.next = state[index+1].buttonNext;
    },
    toLastState(thisMode){
      let index = state.findIndex(({mode}) => mode === thisMode)
      this.mode = state[index-1].mode;
      this.next = state[index-1].buttonNext;
    }
  },
}
</script>

<template>
  <div class="flex flex-wrap justify-center p-10 bg-gray-100">
    <div class="block w-full my-2">
      <span>Name:</span>
      <template v-if="mode == 'isEditing'">
        <input v-model="philosopherForm.name" class=""/>
      </template>
      <template v-else>
        <span>{{mode == 'isShow' ? philosopher.name : philosopherForm.name}}</span>
      </template>
    </div>
    <button @click="toNextState(mode)">{{next}}</button>
    <template v-if="mode !== 'isShow'">
      <button @click="toLastState(mode)">Back</button>
    </template>
  </div>
</template>

<style>

</style>
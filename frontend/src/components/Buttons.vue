<script setup>
  import { watch } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  import { useState } from '@/lib/state';


  import { useMode } from '@/stores/phForm';
  const storeMode = useMode();
  const switchMode = (mode) => storeMode.switchMode(mode);
  // const props = defineProps(['mode']);
  // const [mode, setMode] = useState(props.mode);
  const [mode, setMode] = useState(storeMode.mode);
  watch(storeMode, () => {
    setMode(storeMode.mode);
    console.log(storeMode.mode);
  })

  const emit = defineEmits(['setMode']);

  import { useUserInfo } from '@/stores/userInfo';
  const storeUserInfo = useUserInfo();
  const toEdit = () => {
    if (!storeUserInfo.info.id) {
      router.push('/users/login');
    } else {
      switchMode('edit');
      // phInput.init(phData);
      // emit('setMode', 'edit');
      // console.log(storeUserInfo.info);
    }
  }

  const submitPh  = () => {
    console.log('submit');
  }
</script>

<template>
  <div>
    <template v-if="mode === 'view'">
      <button @click="toEdit" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Edit</button>
    </template>
    <template v-if="mode === 'edit'">
      <button @click="switchMode('view')" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Back</button>
      <button @click="switchMode('confirm');" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Next</button>
    </template>
    <template v-if="mode === 'confirm'">
      <button @click="switchMode('edit');" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Back</button>
      <button @click="submitPh" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Submit</button>
    </template>
  </div>
</template>

<style>

</style>
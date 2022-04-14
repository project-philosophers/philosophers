<script setup>
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();
  // import { getPh, parsePh, getNameList } from '../../util/philosopher';
  import { usePhInput } from '@/stores/phForm'
  import { useSelectedPhId } from '@/stores/selectedPh';
  import { useState } from '@/lib/state';

  const props = defineProps(['phId', 'type'])
  const emit = defineEmits(['toNextMode'])
  const phInput = usePhInput()


  import { useStorePhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  const data = storePhils.data;
  const getPh = id => data.find(ph => ph.id === id);
  const getNameList = (arr) => arr.map(id => getPh(id).name);


  const phData = getPh(props.phId);
  const selectedPhId = useSelectedPhId();

  const ph = ref(phData);

  watch(selectedPhId, () => {
    ph.value = getPh(selectedPhId.id);
  })

  const [phViewType, setPhViewType] = useState('info');

  import { useUserInfo } from '@/stores/userInfo';
  const storeUserInfo = useUserInfo();
  const toEdit = () => {
    if (storeUserInfo.info.id) {
      phInput.init(phData);
      emit('toNextMode', 'edit');
      // console.log(storeUserInfo.info);
    } else {
      router.push('/users/login');
    }
  }

  const phDataDic = {
    name: 'Name',
    name_original: 'Original Name',
    name_other: 'Other Names',
    gender: 'Gender',
    born: 'Born',
    born_date: 'Born Date',
    birthplace: 'Birth Place',
    died: 'Died',
    died_date: 'Died Date',
    deathplace: 'Death Place'
  }

  const goPage = () => {
    // router.push(`/philosophers/${phData.id}`);
  }

  console.log(phData);
</script>

<template>
  <div class="relative h-screen pb-20 p-5 bg-gray-100">
    <div class="pb-2 text-1xl">{{ ph.name_full }}</div>
    <div class="w-2/2 flex flex-row">
      <div class="w-1/2 text-center text-xs cursor-default" @click="setPhViewType('info')">INFO</div>
      <div class="w-1/2 text-center text-xs cursor-default" @click="setPhViewType('tags')">TAGS</div>
    </div>
    <div class="w-2/2 text-xs overflow-y-scroll">
      <template v-if="phViewType === 'info'">
        <div v-for="(item, idx) in Object.keys(phDataDic)" :key="idx">
          <div class='block w-full my-1'>
            <span>{{ phDataDic[item] }}: </span>
            <span>{{ ph[item] }}</span>
          </div>
        </div>
        <div v-for="(key, idx) in ['influenced', 'influences']" :key="idx">
          <div class='block w-full my-1' :key="idx">
            <span>{{ key }}: </span>
            <div v-for="(p, idx) in getNameList(ph[key])" :key="idx">
              <span :key="idx" class='inline-block bg-white px-2 py-1 m-1 rounded-lg cursor-pointer'>{{ p }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div>
      <button @click="toEdit" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Edit</button>
    </div>
    <div class="absolute top-0 right-0 text-xs cursor-pointer" @click="goPage()">
      <!-- page -->
      <router-link :to="`/philosophers/${phId}`">page</router-link>
      <!-- <a :href="`/philosophers/${phId}`">page</a> -->
    </div>
  </div>
</template>

<style>

</style>
<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();

  import { useState } from '@/lib/state';

  import { initPh } from '../../util/philosopher';
  // import { getPh, parsePh, getNameList } from '../../util/philosopher';

  import { useMode } from '@/stores/phForm';
  const storeMode = useMode();
  const [mode, setMode] = useState(storeMode.mode);
  watch(storeMode, () => {
    setMode(storeMode.mode);
  })


  import { useStorePhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  const data = storePhils.data;
  const getPh = id => data.find(ph => ph.id === id);
  const getNameList = (arr) => arr.map(id => getPh(id).name);


  const props = defineProps(['phId'])
  // const props = defineProps(['data'])
  // const [phData, setPhData] = useState({});
  // let phData = [];
  let phData = getPh(props.phId);
  watch(props, () => {
    phData = getPh(props.phId);
    // setPhData(getPh(props.phId));
    // setPhData(props.data);
  })


  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();
  // const [phData, setPhData] = useState({});
  // watch(selectedPhId, () => {
  //   if (mode.value === 'view') {
  //     setPhData(getPh(selectedPhId.id));
  //   }
  // })

  // const phData = getPh(props.phId);

  // import { usePhInput } from '@/stores/phForm';
  // const phInput = usePhInput();
  // const inputData = Object.keys(phInput.data).length ? phInput.data : initPh();




  // const ph = ref(phData);

  // watch(selectedPhId, () => {
  //   ph.value = getPh(selectedPhId.id);
  // })

  // const inputData = phData.value;
  // console.log(inputData);



  const [phViewType, setPhViewType] = useState('info');

  // import { useUserInfo } from '@/stores/userInfo';
  // const storeUserInfo = useUserInfo();
  // const toEdit = () => {
  //   if (storeUserInfo.info.id) {
  //     phInput.init(phData);
  //     emit('toNextMode', 'edit');
  //     // console.log(storeUserInfo.info);
  //   } else {
  //     router.push('/users/login');
  //   }
  // }

  const phDataDic = {
    name: 'Name',
    name_original: 'Original Name',
    name_other: 'Other Names',
    gender: 'Gender',
    born: 'Born',
    born_date: 'Born Date (dd/mm)',
    birthplace: 'Birth Place',
    died: 'Died',
    died_date: 'Died Date (dd/mm)',
    deathplace: 'Death Place'
  }

  const goPage = () => {
    // router.push(`/philosophers/${phData.id}`);
  }


  const [editingKey, setEditingKey] = useState('default');
  const plusInf = (e) => {
    const newEditingKey = editingKey.value === 'default' ? e.target.id : 'default';
    setEditingKey(newEditingKey);
  }
  const deleteInf = (key, id) => {
    phData[key] = phData[key].filter(i => i !== id);
  }

  watch(selectedPhId, () => {
    if (editingKey.value !== 'default') {
      console.log(editingKey.value, selectedPhId.id);
      phData[editingKey.value].push(selectedPhId.id);
    }
  })


  import Buttons from '../Buttons.vue';


  const bgColor = {
    view: 'bg-gray-100',
    edit: 'bg-orange-100',
    confirm: 'bg-green-100'
  }
</script>

<template>
  <template v-if="!!phData">
  <div :class="'relative w-12/12 h-12/12 p-5' + ' ' + bgColor[mode]">
    <div class="pb-2 text-1xl">{{ phData.name_full }}</div>
    <div class="w-2/2 flex flex-row">
      <div class="w-1/2 text-center text-xs cursor-default" @click="setPhViewType('info')">INFO</div>
      <div class="w-1/2 text-center text-xs cursor-default" @click="setPhViewType('tags')">TAGS</div>
    </div>
    <div class="w-2/2 text-xs overflow-y-scroll">
      <template v-if="phViewType === 'info'">
        <div v-for="(item, idx) in Object.keys(phDataDic)">
          <div class='block w-full my-1'>
            <!-- <span>{{ phDataDic[item] }}: </span> -->
            <!-- <span>{{ ph[item] }}</span> -->
            <!-- contentediable -->
            <input
              class="pl-2"
              type="text"
              v-model="phData[item]"
              :placeholder="phDataDic[item]"
              :disabled="mode !== 'edit'"
              spellCheck="false"
            />
          </div>
        </div>
        <div v-for="key in ['influenced', 'influences']">
          <div class='block w-full my-1'>
            <span>{{ key }}: </span>
            <template v-if="mode === 'edit'">
              <span :id="key" :key="editingKey" class='plus inline-block bg-white px-1 py-0 rounded-lg cursor-pointer' @click="(e) => plusInf(e)">{{ editingKey !== key ? '+' : '-' }}</span>
            </template>
            <div v-for="id in phData[key]">
              <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg cursor-pointer'>
                {{ getPh(id).name }}
                <template v-if="mode === 'edit'">
                  {{ ' ' }}
                  <span @click="deleteInf(key, id)">x</span>
                </template>
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="absolute bottom-5">
      <Buttons :mode="mode" @setMode="mode => setMode(mode)" />
      <!-- <button @click="toEdit" class="bottom-5 ml-2 0px border-zinc-900 border-2 text-xs text-black py-1 px-4 rounded cursor-pointer">Edit</button> -->
    </div>
    <div class="absolute top-0 right-0 text-xs cursor-pointer" @click="goPage()">
      <!-- page -->
      <router-link :to="`/philosophers/${phId}`">page</router-link>
      <!-- <a :href="`/philosophers/${phId}`">page</a> -->
    </div>
  </div>
  </template>
</template>

<style scoped>
  input {
    /* font-size: 30px; */
    font-family: "Courier";
    /* font-family: sans-serif; */
    border: none;
    background: none;
    /* outline: none; */
  }

  input:focus {
    outline: none;
  }

  input::-webkit-contacts-auto-fill-button {
    margin: 0;
    width: 0;
    background-color: transparent;
  }

  ::placeholder {
    font-family: "Courier";
  }
</style>
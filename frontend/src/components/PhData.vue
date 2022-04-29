<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();


  import { useState } from '@/lib/state';


  import { useStorePhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  const data = storePhils.data;
  const getPh = id => data.find(ph => ph.id === id);
  // const getNameList = (arr) => arr.map(id => getPh(id).name);


  const props = defineProps(['phId'])
  // const props = defineProps(['data'])
  // const [phData, setPhData] = useState({});
  // let phData = [];
  import { copyObj } from '@/lib/funcObjs';
  let viewPhData = copyObj(getPh(props.phId));


  const emit = defineEmits(['setInputData']);


  const resetKey = ref(0);
  const reset = () => resetKey.value++;


  import { useMode } from '@/stores/phForm';
  const storeMode = useMode();
  const [mode, setMode] = useState(storeMode.mode);
  watch(storeMode, (from, to) => {
    setMode(storeMode.mode);
    if (mode.value === 'view') {
      reset();
    } else if (mode.value === 'edit') {
      console.log('edit!');
    } else {
      // check
      console.log('phData', getPh(props.phId));
      console.log('viewPhData', viewPhData);
      emit('setInputData', viewPhData);
    }
  })


  const [phDataViewType, setPhDataViewType] = useState('info');

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


  const input = (e, item) => {
    const value = e.target.innerText;
    viewPhData = {
      ...viewPhData,
      [item]: value
    };
  }


  const [editingKey, setEditingKey] = useState('default');
  const plusInf = (e) => {
    const newEditingKey = editingKey.value === 'default' ? e.target.id : 'default';
    setEditingKey(newEditingKey);
  }
  const deleteInf = (key, id) => {
    viewPhData[key] = viewPhData[key].filter(i => i !== id);
  }


  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();
  watch(selectedPhId, () => {
    if (editingKey.value !== 'default') {
      console.log(editingKey.value, selectedPhId.id);
      viewPhData[editingKey.value].push(selectedPhId.id);
    }
  })

</script>

<template>
  <template v-if="!!viewPhData">
  <div class="h-12/12" :key="resetKey">
    <div
      class="input pb-2 text-1xl"
      :contenteditable="mode === 'edit'"
      @input="(e) => input(e, 'name_full')"
      :placeholder="phDataDic['name_full']"      
    >
      {{ viewPhData.name_full }}
    </div>
    <div class="w-2/2 flex flex-row">
      <div class="w-1/3 text-center text-xs cursor-default" @click="setPhDataViewType('info')">INFO</div>
      <div class="w-1/3 text-center text-xs cursor-default" @click="setPhDataViewType('infs')">INFs</div>
      <div class="w-1/3 text-center text-xs cursor-default" @click="setPhDataViewType('tags')">TAGS</div>
    </div>
    <div class="w-2/2 h-12/12 mt-2 pb-10 text-xs overflow-y-scroll">
      <template v-if="phDataViewType === 'info'">
        <!-- <span>info: </span> -->
        <template v-for="item in Object.keys(phDataDic)">
          <div class='block w-full my-1'>
            <div
              class="input pl-2"
              :contenteditable="mode === 'edit'"
              @input="(e) => input(e, item)"
              :placeholder="phDataDic[item]"
            >
              {{ viewPhData[item] }}
            </div>
          </div>
        </template>
      </template>
      <template v-else-if="phDataViewType === 'infs'">
        <div class="pl-2">
          <template v-for="key in ['influences', 'influenced']">
            <div class='block w-full my-1'>
              <div>
                <span>{{ key }}: </span>
                <template v-if="mode === 'edit'">
                  <span :id="key" :key="editingKey" class='plus inline-block bg-white px-1 py-0 rounded-lg cursor-pointer' @click="(e) => plusInf(e)">{{ editingKey !== key ? '+' : '-' }}</span>
                </template>
              </div>
              <div>
                <template v-for="id in viewPhData[key]">
                  <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg cursor-pointer'>
                    {{ getPh(id).name }}
                    <template v-if="mode === 'edit'">
                      {{ ' ' }}
                      <span @click="deleteInf(key, id)">x</span>
                    </template>
                  </span>
                </template>
              </div>
            </div>
          </template>
        </div>
      </template>
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

  .input {
    outline: 0px solid transparent;
  }
  .input:empty:before {
    content: attr(placeholder);
    opacity: 0.5;
  }
  /* [contenteditable] {
    outline: 0px solid transparent;
  } */
</style>
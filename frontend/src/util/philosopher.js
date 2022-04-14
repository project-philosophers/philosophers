import { ref, reactive } from 'vue';
import data from './data';
// import { useStorePhils } from '@/stores/philosophers';
// const storePhils = useStorePhils();
// const data = storePhils.data;

export const initPh = () => {
  return {
    name: '',
    name_original: '',
    name_other: '',
    born: '',
    born_date: '',
    born_questioning: '',
    died: '',
    died_date: '',
    died_questioning: '',
    gender: '',
    birthplace: '',
    deathplace: '',
    influences: [],
    influenced: [],
  }
}

export const getPh = (id) => {
  return data.find(ph => ph.id === id)
}

export const parsePh = (ph) => {
  // console.log('ph', ph)
  
  return [
    {
      label: 'Name',
      type: '',
      value: ph.name || '',
    },
    {
      label: 'Original Name',
      value: ph.name_original || '',
    },
    {
      label: 'Other Name',
      value: ph.name_other || '',
    },
    {
      label: 'Gender',
      value: ph.gender || '',
    },
    {
      label: 'Born',
      value: ph.born || '',
    },
    {
      label: 'Born Date',
      value: ph.born_date || '',
    },
    {
      label: 'Born Question',
      value: ph.born_questioning || '',
    },
    {
      label: 'Birth Place',
      value: ph.birthplace || '',
    },
    {
      label: 'Died',
      value: ph.died || '',
    },
    {
      label: 'Died Date',
      value: ph.died_date || '',
    },
    {
      label: 'Death Place',
      value: ph.deathplace || '',
    },
    {
      label: 'Died Question',
      value: ph.died_questioning || '',
    },
    {
      label: 'Influenced',
      value: getNameList(ph.influenced) || [],
    },
    {
      label: 'Influences',
      value: getNameList(ph.influences) || [],
    }
  ]
}

export const getNameList = (arr) => arr.map(id => getPh(id).name);
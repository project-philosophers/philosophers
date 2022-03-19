import { ref, reactive } from 'vue';
import data from './data';

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
  return data.find(person => person.id === id)
}

export const parsePh = (thePh) => {
  console.log('thePh', thePh)
  return [
    {
      label: 'Name',
      value: thePh.name || '',
    },
    {
      label: 'Original Name',
      value: thePh.name_original || '',
    },
    {
      label: 'Other Name',
      value: thePh.name_other || '',
    },
    {
      label: 'Gender',
      value: thePh.gender || '',
    },
    {
      label: 'Born',
      value: thePh.born || '',
    },
    {
      label: 'Born Date',
      value: thePh.born_date || '',
    },
    {
      label: 'Born Question',
      value: thePh.born_questioning || '',
    },
    {
      label: 'Birth Place',
      value: thePh.birthplace || '',
    },
    {
      label: 'Died',
      value: thePh.died || '',
    },
    {
      label: 'Died Date',
      value: thePh.died_date || '',
    },
    {
      label: 'Death Place',
      value: thePh.deathplace || '',
    },

    {
      label: 'Died Question',
      value: thePh.died_questioning || '',
    },
    {
      label: 'Influenced',
      value: getNameList(thePh.influenced) || '',
    },
    {
      label: 'Influences',
      value: getNameList(thePh.influences) || '',
    }
  ]
}

export const getNameList = (idArr) => {
  const nameArr = [];
  idArr.forEach(id => {
    nameArr.push(getPh(id).name)
  });
  return nameArr;
}
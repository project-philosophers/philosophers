import { ref } from '@vue/composition-api';
import data from './data.ts';
import { format } from 'date-fns'

export const philosophers = ref(data);

export const getPh = (id) => {
  const thePh = data.find(person => person.id === id)
  return thePh;
}

export const parsePh = (thePh) => {
  return [
    {
      label: 'ID',
      value: thePh.id
    },
    {
      label: 'Name',
      value: thePh.name
    },
    {
      label: 'Original Name',
      value: thePh.name_original
    },
    {
      label: 'Other Name',
      value: thePh.name_other
    },
    {
      label: 'Gender',
      value: thePh.gender
    },
    {
      label: 'Born',
      value: thePh.born
    },
    {
      label: 'Born Date',
      value: thePh.born_date
    },
    {
      label: 'Born Question',
      value: thePh.born_questioning
    },
    {
      label: 'Birth Place',
      value: thePh.birthplace
    },
    {
      label: 'Died',
      value: thePh.died
    },
    {
      label: 'Died Date',
      value: thePh.died_date
    },
    {
      label: 'Death Place',
      value: thePh.deathplace
    },

    {
      label: 'Died Question',
      value: thePh.died_questioning
    },
    {
      label: 'Influenced',
      value: getNameList(thePh.influenced)
    },
    {
      label: 'Influences',
      value: getNameList(thePh.influences)
    },
    {
      label: 'CreatedAt',
      value: format(new Date(thePh.createdAt), 'yyyy/MM/dd')
    },
    {
      label: 'Update At',
      value: format(new Date(thePh.updatedAt), 'yyyy/MM/dd')
    },
  ]
}

export const getNameList = (idArr) => {
  const nameArr = [];
  idArr.forEach(id => {
    nameArr.push(getPh(id).name)
  });
  return nameArr;
}
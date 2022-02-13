import { ref } from '@vue/composition-api';
// import data  from './data';
import data from './data.ts';

export const philosophers = ref(data);

export const getPhilosophers = (id) => {
  return data.find(person => person.id === id)
}

export const getName = (id) => {
  return data.find(person => person.id === id)
}
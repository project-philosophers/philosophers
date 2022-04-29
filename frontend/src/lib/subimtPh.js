import axios from 'axios';

const type = '';
export const submitPh = async (data) => {
  if (type === 'create'){
    return await axios({
      method: 'post',
      url: `/api/philosophers//create`,
      data: {
        ph: data
      }
    }).catch(error => {
      console.log(error),
      resError.value = true
    })
  } else {
    return await axios({
      method: 'post',
      url: `/api/philosophers/update`,
      data: {
        ph: data
      }
    }).catch(error => {
      console.log(error),
      resError.value = true
    })
  }
}
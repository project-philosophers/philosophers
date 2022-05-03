import axios from 'axios';
import client from '../../config/axios';

const type = '';
export const submitPh = async (data) => {
  if (type === 'create'){
    return await client({
      method: 'post',
      url: `/api/philosophers//create`,
      data: {
        ph: data
      }
    })
    .catch(err => console.error(err.stack));
  } else {
    return await client({
      method: 'post',
      url: `/api/philosophers/update`,
      data: {
        ph: data
      }
    })
    .catch(err => console.error(err.stack));
  }
}
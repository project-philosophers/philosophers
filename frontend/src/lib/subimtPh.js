import axios from 'axios';

export const logout = async () => {
  await axios.get('/users/logout');
}
import axios from 'axios';

const headers = new Headers();
headers.append('Access-Control-Allow-Origin', 'http://192.168.5.15:3006');
headers.append('Access-Control-Allow-Credentials', 'true');
export default axios.create({
  baseURL: 'http://localhost:3001',
});

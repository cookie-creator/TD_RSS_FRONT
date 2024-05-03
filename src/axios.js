import axios from "axios";
import store from "./store";
import router from "./router";

const axiosClient = axios.create({
  baseURL: import.meta.env.VUE_APP_REMOTE_API_URL || 'http://0.0.0.0:8081/'
  // baseURL: 'http://td-rss.dev.com/'
})

axiosClient.interceptors.request.use(config => {

  config.headers.Authorization = `Bearer ${store.state.user.token}`

  return config;
})

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    sessionStorage.removeItem('TOKEN')
    router.push({name: 'Login'})
  } else if (error.response.status === 404) {
    router.push({name: 'NotFound'})
  }
  return error;
})

export default axiosClient

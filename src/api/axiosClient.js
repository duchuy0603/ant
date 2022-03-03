// api/axiosClient.js 
import axios from 'axios'; 
import queryString from 'query-string'; 
import { getUserFromLocalStorage } from '../helpers/common';
import { getRefreshTokenFromLocalStorage } from '../helpers/common';
import { getTokenFromLocalStorage } from '../helpers/common';
import { saveToken } from '../helpers/common';
// Set up default config for http requests here 
// Please have a look at here `https://github.com/axios/axios#request config` for the full list of configs 

const axiosClient = axios.create({ 
    baseURL: process.env.REACT_APP_API_URL, 
    //  headers: { 
    //     // 'Content-Type': ' multipart/form-data',
    //     Authorization: `Bearer ${token}`
    //  }
    // paramsSerializer: params => queryString.stringify(params)
}); 

axiosClient.interceptors.request.use(async (config) => {  
    const data=getUserFromLocalStorage();
 
const token=getTokenFromLocalStorage();
    
    if(token) {
        config.headers['Authorization'] = 'Bearer ' + token ;
        if(data.type!==1){
            config.headers['Ecommerce_id'] = data.ecommerce_id;
        }
    }
    return config; 
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data && response.data.data && response.data.data.rows) { 
        return response.data.data.rows
    }
    if (response && response.data && response.data.data) { 
        return response.data.data
    }
    if (response && response.data) { 
        return response.data
    }   
    return response; 
    
}, async(error) => { 
    const originalConfig = error.config;
    if (originalConfig.url !== "/users/login" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosClient.post("/users/refresh-token", {
            refreshToken: getRefreshTokenFromLocalStorage(),
          });
          const { accessToken } = rs;
          saveToken(accessToken);
          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    console.log('api error', error);
    return Promise.reject(error)
}

); 

// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });
export default axiosClient;

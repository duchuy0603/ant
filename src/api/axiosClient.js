// api/axiosClient.js 
import axios from 'axios'; 
import queryString from 'query-string'; 

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
    const token=localStorage.getItem('token')
    
    if(token) {
        config.headers['Authorization'] = 'Bearer ' + token;
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
}, (error) => { 
    // Handle errors 
    // throw error; 
    console.log('api error', error);
}); 

export default axiosClient;
//
// import axios from 'axios'
// let token = localStorage.getItem("token")
//  const axiosClient = axios.create({
//     baseURL: `${process.env.REACT_APP_API_URL}`,
//     headers: {
//         // 'Content-Type': 'application/json',
//         // 'Content-Type': ' multipart/form-data',
       
//         Authorization: `Bearer ${token}`
//     },
// });
// export  default axiosClient
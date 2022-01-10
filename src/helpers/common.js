const isEmptyObject = (obj) => {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

export const helpers = {
  isEmptyObject,
}
//Token LocalStorage
export const saveToken = (token) => {
  if(token !== null && token !== ''){
    localStorage.setItem('token', token);
  }
}

export const removeToken = () => {
  localStorage.removeItem('access_token');
}

export const getTokenFromLocalStorage  = () => {
  const token = localStorage.getItem('access_token');
  return token;
}

//Refresh token LocalStorage
export const saveRefreshToken = (refresh_token) => {
  if(refresh_token !== null && refresh_token !== ''){
    localStorage.setItem('refresh_token', refresh_token);
  }
}

export const removeRefreshToken = () => {
  localStorage.removeItem('refresh_token');
}

export const getRefreshTokenFromLocalStorage  = () => {
  const refresh_token = localStorage.getItem('refresh_token');
  return refresh_token;
}

//Current User LocalStorage
export const saveUser = (data_user) => {
  localStorage.setItem('data_user', JSON.stringify(data_user));
}

export const removeUser = () => {
  localStorage.removeItem('data_user');
}

export const getUserFromLocalStorage  = () => {
  let data = {};
  if (localStorage.getItem('data_user')) {
    try {
      data = JSON.parse(localStorage.getItem('data_user'));
    } catch (e) {
      data = {};
    }
  }
  return data;
}

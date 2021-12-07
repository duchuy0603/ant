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
export const dataUser=(data)=>{
  localStorage.setItem("data_User",JSON.stringify(data))
}
export const Remove=(data)=>{
  localStorage.removeItem(data);
}
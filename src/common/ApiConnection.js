import axios  from "axios";
let API_Token = sessionStorage.getItem("Token");


export const BaseUrl = () => {
    const Url = "https://itiffyconsultants.com/JUST-GO-LIVE/api";
     return Url;
 }

export const CommonapiBody = () =>{

    const obj = {
        key  : 'facb6e0a6fcbe200dca2fb60dec75be7',
        source  : 'WEB',
    }
    return obj
}

 const URL = BaseUrl();
 const API_Key =  'facb6e0a6fcbe200dca2fb60dec75be7'

 export default axios.create({
    baseURL:URL,
    headers: { 
        "device_type": "ANDROID",
        "device_token":"Real 6i",
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+API_Token,
    },
})
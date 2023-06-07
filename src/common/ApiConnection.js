import axios  from "axios";
//let API_Token = sessionStorage.getItem("Token");

//const baseURL = "https://itiffyconsultants.com/JUST-GO-LIVE/api";
export const BaseUrl = () => {
    const Url = "https://itiffyconsultants.com/JUST-GO-LIVE/api";
     return Url;
 }

// 

 const URL = BaseUrl();


//  export default axios.create({
//     baseURL:URL,
//     // headers: { 
//     //     "device_type": "ANDROID",
//     //     "device_token":"Real 6i",
//     //     'Content-Type': 'application/json', 
//     //     'Authorization': 'Bearer '+API_Token,
//     // },
// })


// export async function postApi(url, payload, header){
//     console.log(payload);
//     const response = await axios.post(`${baseURL}/${url}`, payload, {
     
//     });

//     return response

// }



//  export default axios.create({
//     baseURL:URL,
   
//     // headers: { 
//     //     "device_type": "ANDROID",
//     //     "device_token":"Real 6i",
//     //     'Content-Type': 'application/json', 
//     //     'Authorization': 'Bearer '+API_Token,
//     // },
// })


// export async function postApi(url, payload, header){
//     console.log(baseURL + "/" + url);

//     const response = await axios.post(`${baseURL}/${url}`, payload, {});

//     return response

// }



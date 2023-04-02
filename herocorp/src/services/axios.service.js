import axios from 'axios'
import store from "@/store";
// import https from 'https' // pour faire des requêtes en https.
/*
const myaxios = axios.create({
    baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr',
    httpsAgent: new https.Agent({rejectUnauthorized: false}),
    withCredentials: true, // envoi auto. des cookies à d'autres origines
})
*/
const myaxios = axios.create({
    baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr',
    withCredentials: true,
});
myaxios.interceptors.request.use(
    config => {
        console.log("passwd",store.state.auth.passwd);
        console.log("xsfrToken",store.state.data.xsfrToken);
        return { ...config
            , headers: {
                "org-secret":store.state.auth.passwd,
                "x-xsrf-token": store.state.data.xsfrToken
        }}},
    error => { return Promise.reject(error) }
)

myaxios.interceptors.response.use(
    response => {
        console.log("OK"); return response },
    error => {
        console.log("ERROR",error.response.data); return Promise.reject(error) }
)


export default myaxios
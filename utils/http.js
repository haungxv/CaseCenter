//封装axios

import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://222.197.183.59';

//封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//封装post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//封装put请求
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//封装delete请求
export function deleteDate(url){
    return new Promise((resolve, reject) => {
        axios.delete(url)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}
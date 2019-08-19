import Vue from 'vue';
import axios from 'axios';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/proxy' : '',
    timeout: 10000,// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    headers: {// `headers` 是即将被发送的自定义请求头
        'Cache-Control': 'no-cache'
    },
});

export default instance;
// import axios from 'axios';
import { Message } from 'element-ui';
var isArrOrObj = function(obj){  
            if(Array.isArray){  
                return Array.isArray(obj);  
            }else{  
             return Object.prototype.toString.call(obj)==="[object Array]";  
            }  
        }
var settingAxios = function(setting){
  // set baseURL
  axios.defaults.baseURL =setting.baseURL;
  // 'cool-token': '00000000-0000-0000-0000-000000000000'
  axios.defaults.headers.common['cool-token'] = window.token == undefined ? '00000000-0000-0000-0000-000000000000' : window.token
  // axios.defaults.headers.common['cool-token'] = '00000000-0000-0000-0000-000000000000';
  // axios.defaults.headers.common['cool-token'] = window.token == undefined ? '0000000' : window.token
  // 拦截器
  axios.interceptors.response.use(function (response) {
    // 在发送请求之前做些什么
    console.log(response)
    if(response){
      if(!isArrOrObj(response)){
        if(response.hasOwnProperty('data')){
          if(response.data.hasOwnProperty('state')){
          if(response.data.state == 'success'){
            if(response.data.hasOwnProperty('total')){
              return response.data;
            }else{
              return response.data.rows;
            }          
          }else{
           Message({
                  type: response.data.state,
                  message: response.data.message,
                  duration: 3000
              });
            return
          }
        }
        }    
    }else{
      return response
    }    
    }  
  }, function (error) {
    // alert(error)
     Message({
                type: 'error',
                message: error,
                duration: 3000
            });
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}
export {isArrOrObj,settingAxios} 	 

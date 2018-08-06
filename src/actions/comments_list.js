import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'COMMENTS_LIST',
})
export const dispatchSuccess = (data)=> ({
  type: DISPATCH_SUCCESS+'COMMENTS_LIST',
  data: data,
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'COMMENTS_LIST',
  msg: msg
})
export const CommentsListAction = ()=>{
  return (dispatch,getState)=>{
    dispatch(serverDispatch())
      var querystring = require('querystring');
      axios({
        method: 'post',
        url: SERVER+'/comments/index.php',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
          method: 'comments_list'
        })
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
        }else if(response.data.type === 'ok'){
          dispatch(dispatchSuccess(response.data.data));
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}

import {DEFAULT,SERVER_DISPATCH,DISPATCH_SUCCESS,DISPATCH_ERROR,SERVER} from '../constants/';
import axios from 'axios';
import {CommentsListAction} from './comments_list'
export const stateDefAdd = ()=> ({
  type: DEFAULT+'COMMENT_ADD',
})
export const serverDispatch = ()=> ({
  type: SERVER_DISPATCH+'COMMENT_ADD',
})
export const dispatchSuccess = (msg)=> ({
  type: DISPATCH_SUCCESS+'COMMENT_ADD',
  msg: msg
})
export const dispatchError = (msg)=> ({
  type: DISPATCH_ERROR+'COMMENT_ADD',
  msg: msg
})
export const CommAddAction = (values)=>{
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
          method: 'comment_add',
          email: values.email,
          comment: values.comment,
          subject: values.subject
        })
      })
      .then(function (response) {
        if (response.data.type === 'error') {
          dispatch(dispatchError(response.data.msg));
        }else if(response.data.type === 'ok'){
          dispatch(dispatchSuccess(response.data.msg));
          dispatch(CommentsListAction());
        }else{
          dispatch(dispatchError('server no response'));
        }
      })
      .catch(function (error) {
        dispatch(dispatchError('server error response'));
      });
  }
}

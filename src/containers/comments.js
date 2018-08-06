import {CommentsListAction} from '../actions/comments_list'
import {CommAddAction,stateDefAdd} from '../actions/comments_add'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import Comments from '../components/Comments'
const mapStateToProps = (state) => {
  return {
    loading_list: state.comments_list.loading,
    errorserver_list: state.comments_list.errorserver,
    comments_success: state.comments_list.success,

    loading_add: state.comments_add.loading,
    errorserver_add: state.comments_add.errorserver,
    success_add: state.comments_add.success
  }
}

const mapDispatchToProps = (dispatch) => ({
  commentsList: ()=>{
      dispatch(CommentsListAction());
  },
  commentAdd: (values)=>{
    dispatch(CommAddAction(values));
  },
  defaultAdd: ()=>{
    dispatch(stateDefAdd());
  }
})
export const CommentsCont = withRouter(connect(
 mapStateToProps,
 mapDispatchToProps
)(Comments))

import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer, getAllStudentReducer } from './user_reducer';
import { getRecomBookReducer,getAllBookReducer, addBookReducer,filterValuesReducer } from './book_reducer.js';
import { issueRqquestReducer , getAllIssueBookReqReducer, getAllReturnBookReqReducer,userIssuedBookReducer,allIssuedBookReducer, singleIssuedBookReducer} from './issue_reducer';

const rootReducer = combineReducers({
  userLoginReducer: userLoginReducer,
  userRegisterReducer: userRegisterReducer,
  getAllStudentReducer:getAllStudentReducer,
  getAllBookReducer: getAllBookReducer,
  addBookReducer: addBookReducer,
  issueBookReducer: issueRqquestReducer,
  getissueRequestReducer:getAllIssueBookReqReducer,
  getAllReturnBookReqReducer: getAllReturnBookReqReducer,
  allIssuedBookReducer: allIssuedBookReducer,
  userIssuedBookReducer:userIssuedBookReducer,
  singleIssuedBookReducer:singleIssuedBookReducer,
  getAllIssueBookReqReducer:getAllIssueBookReqReducer,
  filterValuesReducer:filterValuesReducer,
  getRecomBookReducer:getRecomBookReducer,
});

export default rootReducer;

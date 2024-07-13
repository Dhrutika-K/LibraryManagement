import axios from "axios"

//issue request sent to admin by user
export const issueABook = (book)=> async dispatch =>{
    dispatch({
        type:'ISSUE_REQUEST'
    })
  
    try {
        const response = await axios.post('http://localhost:5000/api/issues/issueRequest',book);
        // const response2 = await axios.get('/api/books/allBook');
     
       
        dispatch({
           type:'ISSUE_REQUEST_SUCCESS',
           payload:response.data
       })
      
    } catch (error) {
       dispatch({
           type:'ISSUE_REQUEST_FAILED',
           payload:error
       })

    }
}

//to get details about a specified issued book-->USER
export const singleissueABook = (postId)=> async dispatch =>{
    dispatch({
        type:'SINGLE_ISSUE_REQUEST'
    })
    
    try {
        const response = await axios.post('http://localhost:5000/api/issues/singleIssuedBook',{postId});
        dispatch({
           type:'SINGLE_ISSUE_REQUEST_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'SINGLE_ISSUE_REQUEST_FAILED',
           payload:error
       })
       
    }
}

//to get all books issued by a partivular user-->USER
export const getUserIssuedBook = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_ISSUED_BOOK"
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    };

    try {
        const response = await axios.get('http://localhost:5000/api/issues/issueBooks', config);
        dispatch({
            type: "USER_ISSUED_BOOK_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "USER_ISSUED_BOOK_FAILED",
            payload: error,
        });
    }

};

//to get all the issued books-->ADMIN
export const getAllIssuedBook = () => async (dispatch) => {
    dispatch({
        type: "ALL_ISSUED_BOOK"
    });
    try {
        const response = await axios.get('http://localhost:5000/api/issues/allIssuedBook');
        console.log(response.data)
        dispatch({
            type: "ALL_ISSUED_BOOK_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_ISSUED_BOOK_FAILED",
            payload: error,
        });
    }

};

//to filter the issued books-->ADMIN 
export const filterallIssuedBook = (searchKey)=> async dispatch =>{
   
    var filterItem ;
    try {
        const response = await axios.get('http://localhost:5000/api/issues/allIssuedBook');
        
        filterItem = response.data.filter(item => item.userName.toLowerCase().includes(searchKey.toLowerCase()));
      
        dispatch({
            type: "ALL_ISSUED_BOOK_SUCCESS",
           payload:filterItem
       })
    } catch (error) {
       dispatch({
        type: "ALL_ISSUED_BOOK_FAILED",
           payload:error
       })
    }
}

//to get all the requests for issue sent by students-->ADMIN
export const getAllBookIssueReq = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_ISSUES_REQUEST'
    })
    try {
        const response = await axios.get('http://localhost:5000/api/issues/allIssueRequest');
        dispatch({
           type:'GET_All_ISSUES_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_ISSUES_FAILED',
           payload:error
       })
    }
}


//to accept the issue request sent by student-->ADMIN
export const issuedReq = (postId,bookId)=> async dispatch =>{
   
    try {
         await axios.post('http://localhost:5000/api/issues/issuedReqAccept' , {postId,bookId})
       
        const response2 = await axios.get('http://localhost:5000/api/issues/allIssueRequest');
        dispatch({
           type:'GET_All_ISSUES_SUCCESS',
           payload:response2.data
       })
      } catch (error) {
        console.log(error);
      }
  
}


// export const returnReqAction = (obj)=> async dispatch =>{
   
//     try {
//          await axios.post('http://localhost:5000/api/issues/returnReq' , obj)
       
       
//         dispatch({
//            type:'GET_RETURN_SUCCESS',
           
//        })
//       } catch (error) {
//         console.log(error);
//       }
  
// }

//user returns the book
export const issueABookReturn = (postId)=> async dispatch =>{

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    };
 
    try {
        await axios.post('http://localhost:5000/api/issues/issuedBookDelete',{postId});
        console.log('book returned')
        const response2 = await axios.get('http://localhost:5000/api/issues/issueBooks', config);
        console.log(response2)
        dispatch({
            type: "USER_ISSUED_BOOK_SUCCESS",
            payload: response2.data,
        });
      } catch (error) {
        console.log(error);
      }
  
    
}

export const getAllBookReturnReq = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_RETURN_REQUEST'
    })
    try {
        const response = await axios.get('http://localhost:5000/api/issues/allreturnedBook');
        dispatch({
           type:'GET_All_RETURN_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_RETURN_FAILED',
           payload:error
       })
    }
}

export const issuedReqDeletedByAdmin = (postId)=> async dispatch =>{
    try {
       await axios.post('http://localhost:5000/api/issues/issueReqDelete' , {postId})
       
        const response2 = await axios.get('http://localhost:5000/api/issues/allIssueRequest');
        dispatch({
           type:'GET_All_ISSUES_SUCCESS',
           payload:response2.data
       })
      } 
      catch (error) {
        console.log(error);
      }
  
}

//request to return the book-->ADMIN
export const returnReq = (bookId,userId,due) => async dispatch =>{
    try{
        await axios.post('http://localhost:5000/api/issues/returnReq' , {bookId,userId,due})
        dispatch({
            type:'RETURN_ISSUE_REQUEST_SUCCESS',
            
        })
    } 
    catch (error) {
        console.log(error);
    }
}
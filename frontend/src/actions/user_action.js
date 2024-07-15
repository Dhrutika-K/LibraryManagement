import axios from 'axios';

export const registerUser = (user,navigate) => async dispatch => {
    console.log("USER:",user)
    dispatch({
        type: 'USER_REGISTER_REQUEST'
    })

    try {
        const res = await axios.post("http://localhost:5000/api/users/signup", user);
        console.log(res)
        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: res.data
        })
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate("/dashboard");
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAILED',
            payload: error.response.data.error
        })
    }
}

export const loginUser = (user,navigate) => async dispatch => {
    console.log(user)
    dispatch({
        type: 'USER_LOGIN_REQUEST'
    })

    try {
        const res = await axios.post("http://localhost:5000/api/users/signin", user);
        console.log(res)
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: res.data
        })
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate("/dashboard");
    } catch (error) {
        console.log(error.response.data.error)
        dispatch({
            type: 'USER_LOGIN_FAILED',
            payload: error.response.data.error
        })
    }
}


export const logoutUser = (navigate) => async dispatch => {
    console.log(localStorage.getItem('currentUser'))
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwt');
    dispatch({ type: 'USER_LOGOUT' });
    navigate("/");

}

export const getAllStudent = ()=> async dispatch =>{
    dispatch({
        type:'GET_STUDENTS_REQUEST'
    })
    try {
        const response = await axios.get('http://localhost:5000/api/users/allStudent');
   
        dispatch({
           type:'GET_STUDENTS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_STUDENTS_FAILED',
           payload:error
       })
    }
}

export const removeAStudent = (postId)=> async dispatch =>{
 
    try {
         await axios.post('http://localhost:5000/api/users/removeStudent',{postId});
        const response2 = await axios.get('http://localhost:5000/api/users/allStudent');
       
        dispatch({
            type:'GET_STUDENTS_SUCCESS',
            payload:response2.data
        })
      } catch (error) {
        console.log(error);
      }
  
    
}
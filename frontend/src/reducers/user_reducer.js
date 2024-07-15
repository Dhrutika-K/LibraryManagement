const initialState = {
    currentUser: null,
    loading: false,
    error: null
};
export const userRegisterReducer = (state = initialState, action) => {
    console.log(state)
    console.log(action.payload)
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                loading: true
            }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, success: true, currentUser: action.payload }
        case 'USER_REGISTER_FAILED':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return { ...state, currentUser: null };

        default:
            return state
    }
}

export const userLoginReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, success: true, currentUser: action.payload }
        case 'USER_LOGIN_FAILED':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            return { ...state, currentUser: null };

        default:
            return state
    }
}

export const getAllStudentReducer = (state={students:[]},action)=>{
    switch(action.type){
        case 'GET_STUDENTS_REQUEST':
            return {...state,loading:true}
        case 'GET_STUDENTS_SUCCESS':
            return {
                students:action.payload,loading:false
            }    
        case 'GET_STUDENTS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}
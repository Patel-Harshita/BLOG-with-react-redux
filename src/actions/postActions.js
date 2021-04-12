export const deletePost =(id)=>{
    return{
        type: 'DELETE_POST',
        id
    }
}

export const addPost =(title,message)=>{
    return{
        type: 'ADD_POST',
        title,message
    }
}

export const updatePost=(id,title,message)=>{
    return{
        type: 'UPDATE_POST',
        id,title,message

    }
}

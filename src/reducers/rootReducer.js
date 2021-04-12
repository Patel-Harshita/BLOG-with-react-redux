const initState={
    posts:[
            {
                id: '1',
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                message: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
                id: '2',
                title: "qui est esse",
                message: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            }
    ]
}

const rootReducer =(state=initState, action)=>{

    if(action.type === 'DELETE_POST'){
        let newPosts = state.posts.filter(post => action.id !== post.id);
        return{
          ...state,
            posts: newPosts
        }
    }
    if(action.type === 'ADD_POST'){
        let id = state.posts.length > 0 ? String(Number(state.posts[state.posts.length-1].id)+1) : '1'
        state.posts.push({id,title:action.title,message:action.message})
        
        return{
          ...state
        }
    }
    if(action.type === 'UPDATE_POST'){
       return{ 
           ...state,
           posts:state.posts.map(post=>post.id === action.id ? {...post,title:action.title,message:action.message} : post)}
    }
    
    return state;
}

export default rootReducer;
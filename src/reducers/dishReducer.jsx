export default function dishReducer(state, action){

    switch(action.type){
        case 'setObject':{
            return {
                ...state,
                ...action.object
            }
        }
        case 'changeIsActive':
            return {
                ...state,
                isActive: action.nextIsActive
            }
        case 'changeImageUrl':
            return {
                ...state,
                imageUrl: action.nextImageUrl
            }
    }
    throw new Error(`Unhandled action type: ${action.type}`)
}
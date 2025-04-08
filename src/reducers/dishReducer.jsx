export default function dishReducer(state, action){

    switch(action.type){
        case 'setObject':{
            return {
                ...state,
                ...action.object
            }
        }
        case 'changeName':
            return {
                ...state,
                name: action.nextName
            }
        case 'changeDescription':
            return {
                ...state,
                description: action.nextDescription
            }
        case 'changeIsActive':
            return {
                ...state,
                isActive: action.nextIsActive
            }
        case 'changeCategory':
            return {
                ...state,
                category: {
                    ...state.category,
                    id: action.nextCategoryId
                }
            }
        case 'changePrice':
            return {
                ...state,
                price: action.nextPrice
            }
        case 'changeImageUrl':
            return {
                ...state,
                imageUrl: action.nextImageUrl
            }
    }
    throw new Error(`Unhandled action type: ${action.type}`)
}
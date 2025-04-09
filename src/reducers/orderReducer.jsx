export default function orderReducer(state, action){
    switch(action.type){
        case 'modifyOrder':
            return {
                ...state,
                ...action.object
            }
        case 'changeState':
            return {
                ...state,
                state: action.nextState
            }
        case 'changeDishQuantity':
            return {
                ...state,
                dishes: state.dishes.map(dish => {
                    if(dish.dishId === action.dishId){
                        return {
                            ...dish,
                            quantity: action.nextQuantity
                        }
                    }
                    return dish
                })
            }
        case 'removeDish':
            return {
                ...state,
                dishes: state.dishes.filter(dish => dish.dishId !== action.dishId)
            }
        }
        throw new Error("Unhandled action type: ", action.type)
}
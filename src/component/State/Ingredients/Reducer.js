import {
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENTS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  UPDATE_STOCK,
  GET_INGREDIENTS_BY_CATEGORY_REQUEST,
  GET_INGREDIENTS_BY_CATEGORY_SUCCESS,
  GET_INGREDIENTS_BY_CATEGORY_FAILURE
} from "./ActionTypes.js"

const initialState = {
  ingredients: [],
  update: null,
  category: [],
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
    case GET_INGREDIENTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case CREATE_INGREDIENT_SUCCESS: 
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        ingredients: state.ingredients.map((item) => 
          item.id === action.payload.id ? action.payload : item
        ),
      };

      default:
        return state;
  };
};

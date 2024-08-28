import { Action, State } from "../types";
import { AUTO_LANGUAGE } from "../utils/constants";

export const initialState : State = {
     fromLanguage: 'auto',
     toLanguage: 'en',
     fromText: '',
     result: '',
     loading: false
}

export const translateReducer = (state: State = initialState, action: Action) => {

     if (action.type === 'INTERCHANGE_LANGUAGES') {
          if ( state.fromLanguage === AUTO_LANGUAGE ) return state 
          const loading = state.result !== ''
          return {
               ...state,
               result: '',
               fromLanguage: state.toLanguage,
               toLanguage: state.fromLanguage,
               fromText: state.result,
               loading
          }
     }

     if (action.type === 'SET_FROM_LANGUAGE') {
          if (state.fromLanguage === action.payload) return state
          const loading = state.fromText !== ''
          return {
               ...state,
               fromLanguage: action.payload,
               result: '',
               loading
          }
     }

     if (action.type === 'SET_TO_LANGUAGE') {
          if (state.toLanguage === action.payload) return state
          const loading = state.fromText !== ''
          return {
               ...state,
               toLanguage: action.payload,
               result: '',
               loading
          }
     }

     if (action.type === 'SET_FROM_TEXT') {
          const loading = action.payload !== ''
          return {
               ...state,
               loading,
               fromText: action.payload,
               result: ''
          }
     }

     if (action.type === 'SET_RESULT') {
          return {
               ...state,
               loading: false,
               result: action.payload
          }
     }

     return state
}
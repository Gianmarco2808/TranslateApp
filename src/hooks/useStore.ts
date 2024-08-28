import { useReducer } from "react"
import { initialState, translateReducer } from "../reducers/translate-reducer"
import { FromLanguage, Language } from "../types"

export const useStore = () => {

     const [{fromLanguage, toLanguage, fromText, result, loading}, dispatch] = useReducer(translateReducer, initialState)

     const interChangeLanguages = () => {
          dispatch({type: 'INTERCHANGE_LANGUAGES'})
     }

     const setFromLanguage = (payload: FromLanguage) => {
          dispatch({ type: 'SET_FROM_LANGUAGE', payload})
     }

     const setToLanguage = (payload: Language) => {
          dispatch({type: 'SET_TO_LANGUAGE', payload})
     }

     const setFromText = (payload: string) => {
          dispatch({type: 'SET_FROM_TEXT', payload})
     }

     const setResult = (payload: string) => {
          dispatch({type: 'SET_RESULT', payload})
     }

     return {
          fromLanguage,
          toLanguage,
          fromText,
          result,
          loading,
          interChangeLanguages,
          setFromLanguage,
          setToLanguage,
          setFromText,
          setResult
     }
}
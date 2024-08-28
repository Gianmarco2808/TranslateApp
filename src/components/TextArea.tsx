import { Form } from "react-bootstrap"
import { SectionType } from "../types"

type Props = { 
     type: SectionType,
     loading?: boolean,
     onChange: (value: string) => void,
     value: string
}

const commonStyles = { border: 0, height: '200px'}

const getPlaceHolder = ({ type, loading } : { type: SectionType, loading?: boolean}) => {
     if (type === SectionType.From) return 'Introducir texto'
     if (loading === true) return 'Cargando...'
     return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange} : Props) => {

  const styles = type === SectionType.From ? commonStyles : {...commonStyles, backgroundColor: 'f5f5f5'}

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
     onChange(e.target.value)
  }

  return (
     <Form.Control 
          as={'textarea'}
          placeholder={getPlaceHolder({ type, loading })}
          autoFocus={type === SectionType.From}
          onChange={handleChange}
          disabled={type === SectionType.To}
          style={styles}
          value={value}
     />
  )
}

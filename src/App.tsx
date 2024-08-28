import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { FaExchangeAlt } from "react-icons/fa"
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types'
import { TextArea } from './components/TextArea'
import { FaRegCopy } from "react-icons/fa"
import { useDebounce } from './hooks/useDebounce'
import { useEffect } from 'react'
import { TranslateCohere } from './services/cohereService'
import { AiTwotoneSound } from "react-icons/ai"

function App() {
  
  const { fromLanguage, toLanguage, fromText, result, loading, interChangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return
    TranslateCohere({ fromLanguage, toLanguage , text: debouncedFromText })
        .then(result => {
          if (result == null) return
          setResult(result)
        })

  }, [fromLanguage, toLanguage, debouncedFromText])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid className="app-container">
      <h2 className="app-title">App Traducción</h2>
      <Row className="app-row">
        <Col xs={12} md={5}>
          <Stack gap={3}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs="auto" className="text-center switch-col">
          <Button variant="outline-secondary" onClick={interChangeLanguages} className="switch-button">
            <FaExchangeAlt size={24} />
          </Button>
        </Col>
        <Col xs={12} md={5}>
          <Stack gap={3}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div className="text-area-container">
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div className="button-group">
                <Button variant="outline-secondary" onClick={handleClipboard} className="action-button">
                  <FaRegCopy size={20} />
                </Button>
                <Button variant="outline-secondary" onClick={handleSpeak} className="action-button">
                  <AiTwotoneSound size={20} />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App

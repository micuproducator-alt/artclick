import { renderToString } from 'react-dom/server'
import App from './App'

// Folosit doar la build: generează HTML-ul paginii ca Google să vadă textul direct.
export function render() {
  return renderToString(<App />)
}

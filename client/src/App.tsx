import { Route, Routes } from "react-router-dom"
import Game from "./pages/Game"
import Home from "./pages/Home"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element = {<Game />} />
    </Routes>
  )
}

export default App

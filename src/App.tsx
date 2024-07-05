import { useState } from 'react'

import './App.css'

function quikChat(phoneNumber: string) {
  if (phoneNumber.length === 10) {
    window.location.href = `https://wa.me/91${phoneNumber}`
  }

}


function App() {
  const [inputNumber, setInputNumber] = useState('');


  return (
    <>
      <input type='text' min={1} max={10} value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} />
      {/* {inputNumber.length === 10 ? <p>Valid Number</p> : <p>Invalid Number</p>} */}
      <button onClick={() => quikChat(inputNumber)} disabled={inputNumber.length === 10}>Chat</button>
    </>
  )
}

export default App

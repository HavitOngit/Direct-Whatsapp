import { useState } from 'react'

import './App.css'

function quikChat(phoneNumber: string) {
  if (phoneNumber.length === 10) {
    window.location.replace(`https://wa.me/91${phoneNumber}`)
  }


}

function InputErrors({ inputNumber }: { inputNumber: string }) {
  if (inputNumber.length === 10) {
    return <p style={{ color: 'green' }}>Valid Number</p>;
  } else if (inputNumber.length > 0) {
    return <p style={{ color: 'red' }}>Invalid Number</p>;
  } else {
    return null;
  }
}

function App() {
  const [inputNumber, setInputNumber] = useState('');

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    quikChat(inputNumber);
  }


  return (
    <>
      <h1>Quick Chat</h1>

      <form onSubmit={handelSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
        <label htmlFor="phoneNumber">Enter your phone number:</label>
        <input
          type="number"
          id="phoneNumber"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <InputErrors inputNumber={inputNumber} />
        <button type="submit" style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Chat
        </button>
      </form>
    </>
  )
}

export default App

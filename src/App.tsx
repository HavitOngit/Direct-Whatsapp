import { useState } from 'react'


import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

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

      <a href='/help.html'>Help</a>



      <form onSubmit={handelSubmit} className='flex flex-col gap-4'>
        <div>

          <Label htmlFor="phoneNumber">Mobile Number</Label>
          <Input
            placeholder='Enter Mobile Number'
            type="number"
            id="phoneNumber"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            style={{ padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <InputErrors inputNumber={inputNumber} />
        </div>
        <Button type="submit">Chat</Button>
      </form>


    </>
  )
}

export default App

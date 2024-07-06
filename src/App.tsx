import { useState } from 'react'

import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

import { CameraIcon } from '@radix-ui/react-icons';
import Webcam from './Camera';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';




function quikChat(phoneNumber: string) {
  if (phoneNumber.length === 10) {
    window.location.replace(`https://wa.me/91${phoneNumber}`)
  }


}




function InputErrors({ inputNumber }: { inputNumber: string }) {
  if (inputNumber.length === 10) {
    return <p className='text-green-600 '>valid✅</p>;
  } else if (inputNumber.length > 0) {
    return <p style={{ color: 'red' }}>Invalid Number</p>;
  } else {
    return null;
  }
}


function CamaraPrompt() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'}>

          <CameraIcon className='w-6 h-6' />
        </Button>
      </DialogTrigger>
      <DialogHeader className='hidden'>

        <DialogTitle>Scanner</DialogTitle>
      </DialogHeader>
      <DialogDescription className='hidden'>Sacnner Diloag</DialogDescription>
      <DialogContent>
        <Webcam></Webcam>
      </DialogContent>

    </Dialog>
  )
}

function App() {
  const [inputNumber, setInputNumber] = useState('');

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    quikChat(inputNumber);
  }


  return (
    <>



      <div className='flex h-[90vh] justify-center items-center'>


        <form onSubmit={handelSubmit} className='flex flex-col gap-5'>
          <div>

            <div className='flex'>

              <Input className='w-72'
                placeholder='Enter Mobile Number'
                type="number"
                id="phoneNumber"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}

              />
              <CamaraPrompt></CamaraPrompt>
            </div>

            <div className='justify-end flex'>

              <InputErrors inputNumber={inputNumber} />
            </div>
          </div>
          <Button type="submit" >Chat</Button>
        </form>


      </div>

    </>
  )
}

export default App

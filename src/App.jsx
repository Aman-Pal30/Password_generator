import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('')
  const [copyButton, setCopyButton] = useState('copy')

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNIPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed){
      str += "0123456789"   
    } 
    if(charAllowed){
      str += "`~!@#$%^&*-_="
    }
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 51)
    window.navigator.clipboard.writeText(password).then(() => {
      setCopyButton('Copied');
      setTimeout(() => {
        setCopyButton('Copy');
      }, 4000);
    })
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
  <div className='info'>
    <h1>Password Generator</h1>
    <div className="innerinfo">
    <input type="text" value={password} id='text' placeholder='Password' readOnly ref={passwordRef}/>
    <button onClick={copyPassword} className='btn1'>{copyButton}</button>
    </div>

    <div id='inps'>
      <div className="data">
        <input type="range" min={8} max={50} value={length} id='rangeInput' onChange={(e) => {setLength(e.target.value)}} />
        <label className='lnt'>Length: {length}</label>
      </div>
      <div className="data">
        <input type="checkbox" defaultChecked={numAllowed} id='numberInput' onChange={(e) => {setNumAllowed((prev) => !prev)}} />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="data">
        <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={(e) => {setCharAllowed((prev) => !prev)}} />
        <label htmlFor="charInput">Symbols</label>
      </div>
    </div>
  </div>
    </>
  )
}

export default App

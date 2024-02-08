import logo from './logo.svg';
// import './App.css';
import { Fragment, useState } from 'react';
import { useValidation } from './validation';

function App() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmP: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const { error, isError } = useValidation([
    {
      name: 'username', value: data.username, type: 'string', min: 4, max: 8,
      required: true,
      includeNumber: false,
      customMessage: {
        min: 'Please Enter Minimum 4 characters',
        max: 'Please Enter Maximum 8 characters',
        required: 'Required',
        includeNumber: 'Numbers are not allowed'
      }
    },
    {
      name: 'email', value: data.email, type: 'email',
      required: true,
      customMessage: {
        email: 'Please enter valid email address',
        required: 'Required'
      }
    },
    {
      name: 'password', value: data.password, type: 'string', min: 8, max: 16,
      required: true,
      includeNumber: true,
      customMessage: {
        min: 'Please Enter Minimum 8 characters',
        max: 'Please Enter Maximum 16 characters',
        required: 'Required'
      }
    },
    {
      name: 'confirmP', value: data.confirmP, type: 'compare', comparer: data.password,
      required: true,
      includeNumber: true,
      customMessage: {
        compare: 'Password and confirm password not same',
        required: 'Required'
      }
    }
  ], submitted)

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitHandler = () => {
    setSubmitted(true)
    if (!isError)
    alert(JSON.stringify(data))
  }

  console.log(error);

  const elements = [
    { type: 'text', name: 'username', value: data.username, title: 'User Name' },
    { type: 'text', name: 'email', value: data.email, title: 'Email' },
    { type: 'text', name: 'password', value: data.password, title: 'Password' },
    { type: 'text', name: 'confirmP', value: data.confirmP, title: 'Confirm Password' },
  ]

  return (
    <div className="App">
      <header className="App-header">

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <h4>Registartion</h4>

          {elements.map((element, index) => {
            return <Fragment key={index}>
              <label>{element.title}</label>
              <input type={element.type} name={element.name} value={element.value} onChange={onChangeHandler} />
              <small style={{ fontSize: 11, color: 'red' }}>{error[`${element.name}_error`]}</small>
            </Fragment>
          })}
          <button onClick={submitHandler}>Submit</button>
        </div>

      </header>
    </div>
  );
}

export default App;

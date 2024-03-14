
import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
    title: 'Register',
}

const  Register = async () => {
  return (
    <Form />
  )
}

export default Register
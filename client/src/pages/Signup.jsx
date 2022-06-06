import React from 'react'
import styled from 'styled-components'

const Signup = () => {
  return (
    <FormContainer>
      <div>Signup</div>
    <Input type="text" color='red' />
    </FormContainer>
  )
}

export default Signup

const FormContainer = styled.div`
color: blue;
background-color: red;
`

const Input = styled.input`
color: ${props => props.color || 'green'}
`
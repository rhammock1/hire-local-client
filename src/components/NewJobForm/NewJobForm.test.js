import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import NewJobForm from './NewJobForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <NewJobForm />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Job from './Job'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Job />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})

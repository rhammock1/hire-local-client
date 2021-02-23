import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import NewResume from './NewResume'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <NewResume />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})

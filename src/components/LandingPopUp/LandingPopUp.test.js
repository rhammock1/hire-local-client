import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import LandingPopUp from './LandingPopUp'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <LandingPopUp />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})

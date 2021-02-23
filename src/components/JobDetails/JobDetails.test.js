import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import JobDetails from './JobDetails'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <JobDetails />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})

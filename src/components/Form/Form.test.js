import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Label, Input, Required, Textarea } from './Form'

it('renders Label without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Label />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders Input without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <Input />
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

it('renders Required without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
        <Required />
        </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders Textarea without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
        <Textarea />
        </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
})
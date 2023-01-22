import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className='title'>
            <p className='symbolT'>T</p>
            <p>.</p>
            <p className='symbolE'>E</p>
            <p>.</p>
            <p className='symbolA'>A</p>
        </div>
        <h3 className='abreviation'>Test English AI</h3>
    </div>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <div className="header-container d-flex align-items-center justify-content-between">
			<div className="header--logo">
				<Link to='/'>Todos</Link>
			</div>
	</div>
  )
}

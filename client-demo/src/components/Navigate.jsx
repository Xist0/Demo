import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom'

function Navigate() {
    return (
        <div className="container">
            <div className='Nav-container'>
                <Link to='/'>Главная</Link>
                <Link to='/PersonalAccount'><CgProfile /></Link>

            </div>
        </div>
    )
}

export default Navigate
import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom' 

function Nav({links, section}) {
    return (
        <nav className = {`${section}__nav nav`}>
            <ul className = {`${section}__nav-list nav-list`}>
                {links.map(({href, text}, i) => 
                    <li className = {`${section}__nav-link nav-link`} key = {i}>
                        <Link to = {href} className = {`${section}__nav-anchor nav-anchor`}>
                            {text}
                        </Link>
                    </li>    
                )}
            </ul>
        </nav>
    )
}

export default Nav
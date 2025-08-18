import { aboutme, projects, home, modify, profile } from '../assets/images/nav-logos.js'
import header from '../assets/images/todotodologo.png'
import React, { useEffect } from 'react'

function Header({ currentPage, onNavBarClick }) {

    // Add a style for a selected page everytime this component mounts and the currentPage value changes.
    useEffect(() => {
        var pageId = "#" + currentPage;
        document.querySelector(pageId).classList.add("border-b-4")

        return () => {
            document.querySelector(pageId).classList.remove("border-b-4")
        }
    }, [currentPage])

    return (
        <>
            <header className="main-header">
                <nav>
                    <div className='main-header-top'>
                        <div className='main-header-top-logo'>
                            <img src={header} alt="header" />
                            <h1>To-Do TODO</h1>
                        </div>
                        <a href="">← Go back to CodeVANIE's Portfolio</a>
                    </div>
                    <ul className="main-header-nav-bar">
                        <li id='aboutme' onClick={() => onNavBarClick("aboutme")}><img src={aboutme} alt="aboutme" /></li> {/* About Me */}
                        <li id='projects' onClick={() => onNavBarClick("projects")}><img src={projects} alt="projects" /></li> {/* Projects */}
                        <li id='home' onClick={() => onNavBarClick("home")}><img src={home} alt="home" /></li> {/* Home */}
                        <li id='modify' onClick={() => onNavBarClick("modify")}><img src={modify} alt="modify" /></li> {/* Modify */}
                        <li id='profile' onClick={() => onNavBarClick("profile")}><img src={profile} alt="profile" /></li> {/* Profile */}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header
import aboutme from '../assets/images/about-logo.png'
import projects from '../assets/images/projects-logo.png'
import home from '../assets/images/home-logo.png'
import modify from '../assets/images/modify-logo.png'
import header from '../assets/images/todotodologo.png'
import profile from '../assets/images/profile-logo.png'
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
            <div className="main-header">
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
            </div>
        </>
    );
}

export default Header
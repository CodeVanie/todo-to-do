import { aboutme, projects, home, modify, profile, aboutmed, projectsd, homed, modifyd, profiled } from '../assets/images/nav-logos.js'
import header from '../assets/images/todotodologo.png'
import React, { useEffect, useRef } from 'react'

function Header({ currentPage, onNavBarClick, bgImage }) {

    var darkNavClass = useRef("opacity-[0]");
    // Add a style for a selected page everytime this component mounts and the currentPage value changes.
    useEffect(() => {
        var pageId = "#" + currentPage;
        if (currentPage === "modify") {
            document.querySelectorAll(".darknav").forEach(el => {
                el.style.opacity = "1";
            });
            document.querySelector(pageId).classList.add("border-b", "text-red-950")
        } else {
            document.querySelectorAll(".darknav").forEach(el => {
                el.style.opacity = "0";
            });
            document.querySelector(pageId).classList.add("border-b", "text-ptlbrown-300")
        }

        return () => {
            currentPage === "modify" ? document.querySelector(pageId).classList.remove("border-b", "text-red-950") :
                                       document.querySelector(pageId).classList.remove("border-b", "text-ptlbrown-300");
        }
    }, [currentPage])

    return (
            <header className={`main-header ${bgImage}`}>
                <nav>
                    <div className='main-header-top'>
                        <div className='main-header-top-logo'>
                            <img src={header} alt="header" />
                            <h1>To-Do TODO</h1>
                        </div>
                        <a href="">← Go back to CodeVANIE's Portfolio</a>
                    </div>
                    <ul className="main-header-nav-bar">
                        <li id='aboutme' onClick={() => onNavBarClick("aboutme")}>
                            <div className='main-header-nav-bar-icon'>
                                <img src={aboutme} alt="aboutme" />
                                <img src={aboutmed} alt="aboutmed" className="darknav"/>
                            </div>
                        </li> {/* About Me */}
                        <li id='projects' onClick={() => onNavBarClick("projects")}>
                            <div className='main-header-nav-bar-icon'>
                                <img src={projects} alt="aboutme" />
                                <img src={projectsd} alt="projectsd" className="darknav"/>
                            </div>
                        </li> {/* Projects */}
                        <li id='home' onClick={() => onNavBarClick("home")}>
                            <div className='main-header-nav-bar-icon'>
                                <img src={home} alt="home" />
                                <img src={homed} alt="homed" className="darknav"/>
                            </div>
                        </li> {/* Home */}
                        <li id='modify' onClick={() => onNavBarClick("modify")}>
                            <div className='main-header-nav-bar-icon'>
                                <img src={modify} alt="modify" />
                                <img src={modifyd} alt="modifyd" className="darknav"/>
                            </div>
                        </li> {/* Modify */}
                        <li id='profile' onClick={() => onNavBarClick("profile")}>
                            <div className='main-header-nav-bar-icon'>
                                <img src={profile} alt="profile" />
                                <img src={profiled} alt="profiled" className="darknav"/>
                            </div>
                        </li> {/* Profile */}
                    </ul>
                </nav>
            </header>
    );
}

export default Header
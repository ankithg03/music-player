import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const [toggle, setToggle] = useState(true)
    return (
        <header
            className="container mx-auto flex w-full items-center justify-between py-4 px-6"
        >
            <NavLink to={'/'}>
                <div
                    className="w-full text-center text-lg font-extrabold sm:w-fit sm:text-left"
                >
                    <span className="text-violet-500">React</span>
                    <span className="dark:text-slate-400">Example</span>
                </div>
            </NavLink>
            <nav className="hidden bg-white text-base dark:bg-slate-900 sm:block">
                <ul className="flex items-center space-x-2">
                    <li className="group relative">
                        <NavLink to={'/'}
                            className="block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="group relative">
                       <span
                            className="cursor-pointer block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                        >
                            About & Terms
                        </span>
                        <ul
                            className="invisible right-3 absolute z-30 space-y-2 rounded-lg border border-slate-50 bg-white p-4 opacity-0 shadow-xl transition-opacity delay-75 ease-in-out group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900"
                        >
                            <li>
                            <NavLink
                                    className="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                                    to="/about"
                                >
                                   About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                                    to="/"
                                >
                                    terms & condition
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <button
                className={`block text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 ${toggle?`sm:hidden`: ''}`}
                title="Open navigation menu"
                onClick={()=>setToggle(!toggle)}
            >
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    width="1.2em"
                    height="1.2em"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
            <div className={`fixed top-0 right-0 z-10 h-full w-full bg-slate-900 dark:opacity-90 sm:hidden transition-all ${toggle?`opacity-0  -translate-x-full shadow-2xl`: `opacity-70`}`} />
            <nav
                className={`fixed top-0 z-20 h-full w-2/3 transform overflow-y-auto bg-white py-4 text-base transition dark:bg-slate-900 sm:hidden -right-2/3 ${toggle?``: `-translate-x-full shadow-2xl`}`}
            >
                <ul className="flex flex-col space-y-2">
                    <li className="text-right">
                        <button
                            className="px-6 py-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                            onClick={()=>setToggle(!toggle)}
                        >
                            <svg
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24"
                                width="1.2em"
                                height="1.2em"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 12h14m-4 4l4-4m-4-4l4 4"
                                ></path>
                            </svg>
                        </button>
                    </li>
                    <li className="group relative w-full overflow-x-visible text-right">
                        <a
                            className="mx-4 block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                            href="/"
                        >
                            Home
                        </a>
                    </li>
                    <li className="group relative w-full overflow-x-visible text-right">
                        <span
                            className="mx-4 block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                        >
                            About & Terms
                        </span>
                        <ul
                            className={`h-0 space-y-2 overflow-y-hidden bg-slate-50 px-4 py-0 transition-all delay-75 ease-in-out dark:bg-slate-800 ${!toggle?'group-hover:h-full group-hover:py-4':''}`}
                        >
                            <li>
                                <NavLink
                                    className="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                                    to="/about"
                                    onClick={()=>setToggle(!toggle)}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                            <NavLink
                                    className="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                                    to="/"
                                    onClick={()=>setToggle(!toggle)}
                                >
                                    Terms & Condition
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
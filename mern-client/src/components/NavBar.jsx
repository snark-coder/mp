import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaBlog, FaXmark, FaBarsStaggered } from "react-icons/fa6";


const NavBar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isSticky, setisSticky] = useState(false);

    // toggle menu
    const toggleMenu = ()=> {
        setisMenuOpen(!isMenuOpen);
    }

    useEffect(()=> {
        const handleScroll = () => {
            if(window.scrollY > 100){
                setisSticky(true)
            }
            else{
                setisSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return ()=>{
            window.addEventListener("scroll", handleScroll);
        }
    },[])

    //navItems

    const navItems = [
        {link: "Home", path:"/"},
        {link: "About", path:"/about"},
        {link: "Shop", path:"/shop"},
        {link: "Rent your book", path:"/admin/dashboard"},
        {link: "Blog", path:"/blog"}
    ]
  return (
    
    <div>
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-red-300": ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* logo */}
                    <Link to="/" className='text-2xl font-bold text-red-700 flex items-center gap-2'><FaBlog className='inline-block'/>Books</Link>
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({link, path})=> <Link key={path} to = {path} className='block text-base text-black uppercase cursor-pointer hover:text-red-700 '>{link}</Link>)
                        }
                    </ul>
                    {/* button for lg devices */}
                    <div className='space-x-12 lg:flex items-center hidden '>
                        <button><FaBarsStaggered className='w-5 hover:text-red-700'/></button>

                    </div>

                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen?<FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5 w-5 text-black'/>
                            }
                        </button>
                    </div>
                </div> 
                

                <div className={`space-y-4 px-4 mt-12 py-7 bg-red-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0":"hidden"}`}>
                        {
                            navItems.map(({link, path})=> <Link key={path} to = {path} className='block text-base text-white uppercase cursor-pointer '>{link}</Link>)
                        }

                </div>
            </nav>
        </header>
      
    </div>
  )
}

export default NavBar

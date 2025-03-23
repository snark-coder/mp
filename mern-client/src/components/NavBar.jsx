import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaBlog } from "react-icons/fa6";


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
        <header>
            <nav>
                <div>
                    {/* logo */}
                    <Link to="/" className='text-2xl font-bold text-red-700 flex items-center gap-2'><FaBlog className='inline-block'/>Books</Link>
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({link, path})=> <Link key={path} to = {path} className='block text-base text-black uppercase cursor-pointer hover:text-red-700'>{link}</Link>)
                        }
                    </ul>
                </div>
            </nav>
        </header>
      
    </div>
  )
}

export default NavBar

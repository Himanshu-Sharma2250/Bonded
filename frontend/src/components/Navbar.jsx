import { useState, useRef } from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    useGSAP(() => {
        if (isMenuOpen) {
            // Open animation
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut',
            });
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.4,
                ease: 'power2.out',
            });
            gsap.fromTo(
                linksRef.current,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power2.out',
                }
            );
        } else {
            // Close animation
            gsap.to(menuRef.current, {
                x: '-100%',
                duration: 0.3,
                ease: 'power2.in',
            });
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.inOut',
            });
        }
    }, { dependencies: [isMenuOpen], scope: menuRef.current }); 

    return (
        <>
            <nav className="relative flex items-center justify-between px-4 py-2 bg-white shadow-sm md:px-5 z-20">
                {/* Hamburger icon for mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="p-1 focus:outline-none">
                        <Menu className="w-6 h-6 text-[#374151]" />
                    </button>
                </div>

                {/* Logo: centered on mobile, left-aligned on desktop */}
                <div className="flex-1 text-center md:text-left md:flex-none">
                    <h1 className="text-2xl font-bold md:text-3xl">Bonded</h1>
                </div>

                {/* Desktop navigation links (hidden on mobile) */}
                <div className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        <li><a href="#" className="text-[#374151] hover:text-[#1E4A68] text-lg">Home</a></li>
                        <li><a href="#" className="text-[#374151] hover:text-[#1E4A68] text-lg">Teams</a></li>
                        <li><a href="#" className="text-[#374151] hover:text-[#1E4A68] text-lg">About Us</a></li>
                        <li><a href="#" className="text-[#374151] hover:text-[#1E4A68] text-lg">Contact</a></li>
                    </ul>
                </div>

                {/* Login/Signup buttons */}
                <div className="flex items-center gap-2">
                    <NavLink to="/signin">
                        <Button name="Log In" bgColor="#2A6E8C" btnSize="16px" />
                    </NavLink>
                    <NavLink to="/signup">
                        <Button name="Sign Up" bgColor="#FF7A59" btnSize="16px" />
                    </NavLink>
                </div>
            </nav>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black/50 z-30 md:hidden opacity-0"
                    onClick={closeMenu}
                />
            )}

            {/* Slide‑in side menu */}
            <div
                ref={menuRef}
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 md:hidden transform -translate-x-full"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-2xl font-bold">Bonded</h2>
                    <button onClick={closeMenu} className="p-1">
                        <X className="w-6 h-6 text-[#374151]" />
                    </button>
                </div>
                <ul className="flex flex-col gap-2 p-4">
                    {['Home', 'Teams', 'About Us', 'Contact'].map((item, index) => (
                        <li
                            key={item}
                            ref={(el) => (linksRef.current[index] = el)}
                        >
                            <a
                                href="#"
                                className="block py-2 text-lg text-[#374151] hover:text-[#1E4A68]"
                                onClick={closeMenu}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
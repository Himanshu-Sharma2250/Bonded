import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Mail, X } from 'lucide-react';
import ProfileOptionModal from './ProfileOptionModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const MobileMenu = ({ isOpen, onClose }) => {
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const closeBtnRef = useRef(null);
    const linksRef = useRef([]);
    const profileRef = useRef(null);

    linksRef.current = [];

    const addToLinksRef = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut',
                display: 'block',
            });

            gsap.fromTo(
                containerRef.current,
                { scale: 0.95, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                }
            );

            gsap.fromTo(
                [logoRef.current, closeBtnRef.current, ...linksRef.current, profileRef.current].filter(Boolean),
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'power2.out',
                }
            );
        } else {
            gsap.to(containerRef.current, {
                scale: 0.95,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            });
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(overlayRef.current, { display: 'none' });
                },
            });
        }
    }, { dependencies: [isOpen] });

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/50 z-40 hidden"
                onClick={onClose}
            />
            <div
                ref={containerRef}
                className="fixed inset-0 bg-[#F8FAFC] z-50 flex flex-col overflow-y-auto"
                style={{ opacity: 0, display: isOpen ? 'flex' : 'none' }}
            >
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h1 ref={logoRef} className="text-2xl font-bold">Bonded</h1>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation links */}
                <div className="flex-1 flex flex-col  gap-2 p-4 w-full max-w-md mx-auto">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-3 w-full rounded-md transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#2A6E8C] text-[#F8FAFC]'
                                    : 'text-[#000000] hover:bg-[#E9F1F5] hover:text-[#2A6E8C]'
                            }`
                        }
                        onClick={onClose}
                        ref={addToLinksRef}
                    >
                        <LayoutDashboard className="w-5" />
                        <span className="text-xl">Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/groups"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-3 w-full rounded-md transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#2A6E8C] text-[#F8FAFC]'
                                    : 'text-[#000000] hover:bg-[#E9F1F5] hover:text-[#2A6E8C]'
                            }`
                        }
                        onClick={onClose}
                        ref={addToLinksRef}
                    >
                        <Users className="w-5" />
                        <span className="text-xl">Groups</span>
                    </NavLink>
                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-3 w-full rounded-md transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#2A6E8C] text-[#F8FAFC]'
                                    : 'text-[#000000] hover:bg-[#E9F1F5] hover:text-[#2A6E8C]'
                            }`
                        }
                        onClick={onClose}
                        ref={addToLinksRef}
                    >
                        <Mail className="w-5" />
                        <span className="text-xl">Applications</span>
                    </NavLink>
                </div>

                {/* Profile section at bottom */}
                <div ref={profileRef} className="border-t p-4">
                    <div className="max-w-md mx-auto">
                        <ProfileOptionModal isCollapsed={false} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
import { useState } from 'react';

const Sidebar = ({ onMenuItemClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState({});
    const [menuItems] = useState([
        { id: '1', name: 'Home', link: '/' },
        { id: '2', name: 'About', link: '/about' },
        {
            id: '3',
            name: 'Services',
            link: '/services',
            dropdown: [
                { id: '3-1', name: 'Web Development', link: '/services/web-development' },
                { id: '3-2', name: 'App Development', link: '/services/app-development' },
                { id: '3-3', name: 'SEO Services', link: '/services/seo' },
            ],
        },
        { id: '4', name: 'Contact', link: '/contact' },
    ]);

    const toggleDropdown = (id) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleItemClick = (id) => {
        if (onMenuItemClick) {
            onMenuItemClick(id);
        }
    };

    return (
        <div className="h-screen w-64 bg-gray-800 text-black p-4">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.id} className="mb-2 bg-gray-700 rounded p-2">
                        {item.dropdown ? (
                            <div>
                                <button
                                    onClick={() => toggleDropdown(item.id)}
                                    className="flex justify-between w-full px-4 py-2 text-left hover:bg-gray-600 rounded focus:outline-none"
                                >
                                    {item.name}
                                    <span>{isDropdownOpen[item.id] ? '▲' : '▼'}</span>
                                </button>
                                <ul
                                    className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen[item.id] ? 'max-h-40' : 'max-h-0'
                                        }`}
                                >
                                    {item.dropdown.map((dropdownItem) => (
                                        <li key={dropdownItem.id} className="mb-1">
                                            <a
                                                href={dropdownItem.link}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleItemClick(dropdownItem.id);
                                                }}
                                                className="block px-4 py-2 hover:bg-gray-600 rounded"
                                            >
                                                {dropdownItem.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <a
                                href={item.link}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(item.id);
                                }}
                                className="block px-4 py-2 hover:bg-gray-600 rounded"
                            >
                                {item.name}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

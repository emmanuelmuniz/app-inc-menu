import { useState, useEffect } from 'react';
import './styles.css'

const Sidebar = ({ onMenuItemClick, sections, categories }) => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSectionClick = (section) => {
        if (selectedSection != null) {
            if (selectedSection._id != section._id) {
                setSelectedSection(section);
                setSelectedCategory(null);
            } else {
                setSelectedSection(null);
                setSelectedCategory(null);
            }
        } else {
            setSelectedSection(section);
        }
    };

    const handleCategoryClick = (category) => {
        if (onMenuItemClick) {
            onMenuItemClick(category);
        }

        if (selectedCategory != null) {
            if (selectedSection != null) {
                if (isIdInSectionCategories(category.section._id)) {
                    setSelectedCategory(category);
                } else {
                    setSelectedSection(findSectionById(category.section._id));
                    setSelectedCategory(category);
                }
            } else {
                setSelectedSection(findSectionById(category.section._id));
                setSelectedCategory(category);
            }
        } else {
            if (selectedSection == null) {
                setSelectedSection(findSectionById(category.section._id));
                setSelectedCategory(category);
            } else {
                setSelectedCategory(category);
            }
        }
    };

    const isIdInSectionCategories = (id) => {
        return selectedSection._id == id;
    };

    const findSectionById = (sectionId) => {
        return sections.find(section => section._id === sectionId);
    };


    return (
        <>
            <>
                {sections && sections != [] ? (
                    <div className="w-2/12 bg-gray-800 text-black rounded-sm bg-white h-full rounded-br-xl">
                        <ul className="space-y-1 bg-silver rounded-sm overflow-hidden rounded-br-xl">
                            {sections.map((section) => (
                                <li key={section._id} className={`section text-xl cursor-pointer ${selectedSection && selectedSection._id === section._id ? 'bg-gray text-white' : 'bg-silver text-black'} transition`}>
                                    <div>
                                        <div
                                            key={section._id}
                                            onClick={() => handleSectionClick(section)}
                                            className={`section p-2 pl-4 text-xl cursor-pointer hover:bg-gray font-semibold ${selectedSection && selectedSection._id === section._id ? 'bg-inc-light-blue text-white hover:text-white hover:bg-inc-light-blue' : 'bg-silver text-black'} transition`}>
                                            {section.name_es}
                                        </div>
                                        <div>
                                            <ul className="text-lg">
                                                {categories.filter(category => category.section._id === section._id)
                                                    .map((category) => (
                                                        <li key={category._id} className='cursor-pointer'>
                                                            <div
                                                                className={`category section p-2 pl-8 text-lg cursor-pointer hover:bg-gray  
                                                                ${selectedCategory && selectedCategory._id === category._id ? 'text-inc-light-blue hover:text-inc-light-blue' : 'text-black'} transition`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleCategoryClick(category);
                                                                }}
                                                            >
                                                                {category.name_es}
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center text-white">No sections available</div>
                )}
            </>
        </>
    );
};

export default Sidebar;

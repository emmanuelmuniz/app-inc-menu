"use client"

import "./styles.css";
import Sidebar from "../sidebar/Sidebar";

export default function Editor() {
    const handleMenuItemClick = (id) => {
        console.log('Selected item ID:', id);
    };

    return (
        <div className="flex">
            <Sidebar onMenuItemClick={handleMenuItemClick} />
            <div className="flex-1 p-10">
            </div>
        </div>
    );
}
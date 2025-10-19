import React from "react";
import NavbarUser from "../NavbarUser";

export default function LayoutUser({ children }) {
    return (
        <div className="min-h-screen relative">
            <NavbarUser />
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}

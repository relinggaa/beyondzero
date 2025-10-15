import React from "react";
import NavbarUser from "../NavbarUser";

export default function LayoutUser({ children }) {
    return (
        <div className="min-h-screen bg-slate-800">
            <NavbarUser />
            {children}
        </div>
    );
}

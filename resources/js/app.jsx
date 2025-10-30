import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";
import { Ziggy } from "./ziggy";
// Ensure these images are emitted to build/assets
import meguns from "./img/meguns.png";
import Opung from "./img/Opung.png";
import relinggaa from "./img/relinggaa.png";

if (typeof window !== "undefined") {
    window.__BUILD_ASSETS = { meguns, Opung, relinggaa };
}

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        // Make Ziggy routes available globally
        window.route = (name, params, absolute, config = Ziggy) => {
            return route(name, params, absolute, config);
        };
        
        createRoot(el).render(
            <>
                <App {...props} />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </>
        );
    },
});

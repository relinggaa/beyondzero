import meguns from "../img/meguns.png";
import Opung from "../img/Opung.png";
import relinggaa from "../img/relinggaa.png";

// Expose to window so the imports are not tree-shaken and assets are emitted
// Consumers can read window.__BUILD_ASSETS if they need the URLs at runtime
if (typeof window !== "undefined") {
    window.__BUILD_ASSETS = {
        meguns,
        Opung,
        relinggaa,
    };
}

export { meguns, Opung, relinggaa };



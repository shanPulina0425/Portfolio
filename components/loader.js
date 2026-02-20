async function loadComponent(target) {
    const filePath = target.getAttribute("data-component");
    if (!filePath) {
        return;
    }

    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to load component: ${filePath}`);
    }

    target.innerHTML = await response.text();
}

async function loadAllComponents() {
    const targets = document.querySelectorAll("[data-component]");
    await Promise.all(Array.from(targets, loadComponent));

    document.dispatchEvent(new Event("components:loaded"));
}

document.addEventListener("DOMContentLoaded", () => {
    loadAllComponents().catch((error) => {
        console.error(error);
    });
});

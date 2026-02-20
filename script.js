function openMobileMenu() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(0px)";
    }
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(-500px)";
    }
}

const texts = ["DEVELOPER", "DESIGNER"];
const speed = 100;

function initTypewriter() {
    const textElement = document.querySelector(".typewriter-text");
    if (!textElement || textElement.dataset.initialized === "true") {
        return;
    }

    textElement.dataset.initialized = "true";

    let textIndex = 0;
    let characterIndex = 0;

    function typeWriter() {
        if (characterIndex < texts[textIndex].length) {
            textElement.innerHTML += texts[textIndex].charAt(characterIndex);
            characterIndex += 1;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(eraseText, 1000);
        }
    }

    function eraseText() {
        if (textElement.innerHTML.length > 0) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
            setTimeout(eraseText, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            characterIndex = 0;
            setTimeout(typeWriter, 500);
        }
    }

    typeWriter();
}

function initContactForm() {
    const form = document.getElementById("form");
    if (!form || form.dataset.initialized === "true") {
        return;
    }

    form.dataset.initialized = "true";

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) {
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append("access_key", "8b9f3a7d-3e9c-4da9-a2c1-90f8129c3286");

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Your message has been sent.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function initAnimations() {
    if (window.AOS) {
        AOS.init({ offset: 0 });
    }
}

function initializePage() {
    initTypewriter();
    initContactForm();
    initAnimations();
}

document.addEventListener("components:loaded", initializePage);

window.addEventListener("load", () => {
    if (!document.querySelector("[data-component]")) {
        initializePage();
    }
});

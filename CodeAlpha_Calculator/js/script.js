const display = document.getElementById("display");
const buttons = document.querySelectorAll("button[data-value]");
const themeButtons = document.querySelectorAll("[data-theme]");
const root = document.documentElement;

let input = "";

/* Restore theme */
const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-bs-theme", savedTheme);

/* Calculator logic */
buttons.forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn.dataset.value));
});

function handleInput(value) {
    if (value === "C") {
        clearDisplay();
        return;
    }

    if (value === "=") {
        calculate();
        return;
    }

    input += value;
    display.value = input;
}

function clearDisplay() {
    input = "";
    display.value = "";
}

function calculate() {
    try {
        const result = eval(input);
        display.value = result;
        input = result.toString();
    } catch {
        display.value = "Error";
        input = "";
    }
}

/* Keyboard support */
document.addEventListener("keydown", (e) => {
    if ("0123456789+-*/.".includes(e.key)) {
        input += e.key;
        display.value = input;
    }

    if (e.key === "Enter") {
        e.preventDefault();
        calculate();
    }

    if (e.key === "Backspace") {
        input = input.slice(0, -1);
        display.value = input;
    }

    if (e.key === "Escape") {
        clearDisplay();
    }
});

/* Theme switching */
themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        root.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
    });
});
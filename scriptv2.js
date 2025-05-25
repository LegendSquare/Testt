(function () {
    const key = 'robux_script_executed';

    if (localStorage.getItem(key)) {
        console.log("Script já foi executado antes. Abortando.");
        return;
    }

    setTimeout(() => {
        const span = document.querySelector('span[class*="rbx-text-navbar-right"]');
        if (!span) {
            console.error("Robux span not found.");
            return;
        }

        function parseAbbreviated(text) {
            const cleaned = text.toUpperCase().replace(/[^\d\.KM+B]/g, '');
            if (cleaned.endsWith('B+')) return parseFloat(cleaned) * 1_000_000_000;
            if (cleaned.endsWith('M+')) return parseFloat(cleaned) * 1_000_000;
            if (cleaned.endsWith('K+')) return parseFloat(cleaned) * 1_000;
            return parseInt(cleaned.replace(/[^\d]/g, ''), 10);
        }

        const currentText = span.textContent.trim();
        const currentValue = parseAbbreviated(currentText);

        const input = prompt(`How Much Robux Do You Wanna Add to ${currentText}? (Max: 10000)`);
        if (input === null || input.trim() === "") {
            console.warn("No value");
            return;
        }

        const toAdd = parseInt(input.trim(), 10);
        if (isNaN(toAdd)) {
            alert("Error: Invalid Value");
            return;
        }

        if (toAdd > 10000) {
            alert("Error: You cannot add more than 10,000 Robux at once.");
            return;
        }

        const newValue = currentValue + toAdd;

        span.textContent = newValue.toString();
        localStorage.setItem("roblox_saved_robux", newValue.toString());

        localStorage.setItem(key, 'true');

        console.log(`Novo valor de Robux: ${newValue}`);
    }, 1000);
})();

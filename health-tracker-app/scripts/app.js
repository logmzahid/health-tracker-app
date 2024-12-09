// Unified Form Handling
const form = document.querySelector("#log-form");
const symptomLog = JSON.parse(localStorage.getItem("symptomLog")) || [];

// Handle unified logging of symptoms, date, and moon phase
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const symptom = document.querySelector("#symptom").value; // Get symptom input
    const date = document.querySelector("#date").value; // Get date input
    const phase = document.querySelector("#lunar-phase").value; // Get moon phase input

    // Create a new log entry with all fields
    const entry = { symptom, date, phase };
    symptomLog.push(entry); // Add entry to the log array
    localStorage.setItem("symptomLog", JSON.stringify(symptomLog)); // Save updated log to localStorage

    alert(`Logged: ${symptom} on ${date} during ${phase}`);
    generateCalendar(); // Refresh the calendar to display the new entry
});

// Calendar Handling
const calendarContainer = document.querySelector("#calendar-container");

// Function to generate calendar with logged data
function generateCalendar() {
    const year = new Date().getFullYear(); // Current year
    const month = new Date().getMonth(); // Current month (0-indexed)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the current month

    calendarContainer.innerHTML = ""; // Clear existing calendar content

    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Format date as YYYY-MM-DD
        const entry = symptomLog.find((log) => log.date === date); // Find a log entry matching this date

        // Create a calendar cell for the day
        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day";

        // If an entry exists, add the "logged" class and display data
        if (entry) {
            dayElement.classList.add("logged");
            dayElement.innerHTML = `
                <span class="date">${day}</span>
                <span class="lunar-phase">${entry.phase}</span>
                <span class="symptom">${entry.symptom}</span>
            `;
        } else {
            dayElement.innerHTML = `<span class="date">${day}</span>`;
        }

        calendarContainer.appendChild(dayElement);
    }
}

// Generate the calendar on page load
generateCalendar();

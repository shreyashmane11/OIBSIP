const temperatureInput = document.getElementById("temperature");
const inputUnit = document.getElementById("inputUnit");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


// Convert temperature
function convertTemperature() {

    const value = parseFloat(temperatureInput.value);
    const unit = inputUnit.value;

    errorMessage.textContent = "";

    // Empty input
    if (temperatureInput.value.trim() === "") {
        showError("Please enter a temperature.");
        return;
    }

    // Non-numeric input
    if (isNaN(value)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }

    let celsius;
    let fahrenheit;
    let kelvin;


    // Convert input to Celsius first
    if (unit === "C") {
        celsius = value;
    }

    else if (unit === "F") {
        celsius = (value - 32) * 5 / 9;
    }

    else if (unit === "K") {
        celsius = value - 273.15;
    }


    // Absolute zero validation
    if (celsius < -273.15) {
        showError(
            "Invalid temperature! Temperature cannot be below absolute zero (-273.15°C)."
        );

        clearResults();
        return;
    }


    // Convert Celsius to other units
    fahrenheit = (celsius * 9 / 5) + 32;
    kelvin = celsius + 273.15;


    // Display results
    celsiusResult.textContent = `${formatValue(celsius)} °C`;
    fahrenheitResult.textContent = `${formatValue(fahrenheit)} °F`;
    kelvinResult.textContent = `${formatValue(kelvin)} K`;
}


// Format decimal values
function formatValue(value) {
    return Number(value.toFixed(2));
}


// Display error
function showError(message) {
    errorMessage.textContent = message;
}


// Clear conversion results
function clearResults() {
    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
}


// Clear everything
function clearAll() {
    temperatureInput.value = "";
    inputUnit.value = "C";

    errorMessage.textContent = "";

    clearResults();

    temperatureInput.focus();
}


// Convert button
convertBtn.addEventListener("click", convertTemperature);


// Clear button
clearBtn.addEventListener("click", clearAll);


// Real-time validation
temperatureInput.addEventListener("input", function () {

    const value = temperatureInput.value.trim();

    if (value === "") {
        errorMessage.textContent = "";
        return;
    }

    if (isNaN(Number(value))) {
        showError("Please enter numbers only.");
    } else {
        errorMessage.textContent = "";
    }
});


// Press Enter to convert
temperatureInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        convertTemperature();
    }

});
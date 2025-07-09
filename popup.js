// Wait until the DOM content is fully loaded before running any script
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the saved max tab limit from Chrome local storage
    chrome.storage.local.get(["maxTabLimit"], (result) => {
        // Set the input value to the saved limit or default to 10 if not set
        document.getElementById("limit").value = result.maxTabLimit || 10;
    });
});

/**
 * Function to save the user's max tab limit setting
 */
function setLimit() {
    // Get the value entered in the input field and convert it to a number
    const limit = parseInt(document.getElementById("limit").value);

    // Check if the input is a valid positive number
    if (!isNaN(limit) && limit > 0) {
        // Save the new limit to Chrome local storage
        chrome.storage.local.set({ maxTabLimit: limit }, () => {
            alert("Max tab limit set to " + limit);
        });
    } else {
        // Show error message if input is invalid
        alert("Please enter a valid number greater than 0.");
    }
}

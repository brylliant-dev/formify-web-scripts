document.addEventListener('DOMContentLoaded', function () {
    // Get the button and the container for the fields
    const addFieldButton = document.getElementById('add-field-button');
    const fieldsContainer = document.querySelector('.partner-popup_video-wrapper');
    const addFieldButtonContainer = document.querySelector('.partner-popup_button-wrapper');

    // Maximum number of fields allowed
    const maxFields = 6;

    // Counter to ensure unique IDs and labels
    let fieldCounter = 2;

    // Event listener for the Add More Fields button
    addFieldButton.addEventListener('click', function () {
        // Count current number of `.contact-popup_field-wrapper.is-video` elements
        const currentFieldsCount = fieldsContainer.querySelectorAll('.contact-popup_field-wrapper.is-video').length;

        // Check if we can add more fields
        if (currentFieldsCount < maxFields) {
            // Clone the existing `.contact-popup_field-wrapper.is-video`
            const templateField = document.querySelector('.contact-popup_field-wrapper.is-video');
            if (templateField) {
                const newFieldWrapper = templateField.cloneNode(true);

                // Update the input field's ID and related attributes
                const inputField = newFieldWrapper.querySelector('input.contact-popup_field');
                if (inputField) {
                    const newId = `video-${fieldCounter}`;
                    inputField.id = newId;
                    inputField.name = `Youtube-Video-${fieldCounter}`;
                    inputField.setAttribute('data-name', `Youtube Video ${fieldCounter}`);
                    inputField.value = ''; // Clear any pre-filled value
                    inputField.placeholder = `https://www.youtube.com`;
                }

                // Update the label's "for" attribute and text
                const label = newFieldWrapper.querySelector('label');
                if (label) {
                    label.setAttribute('for', `video-${fieldCounter}`);
                    label.innerHTML = `Youtube Video ${fieldCounter}`;
                }

                // Append the cloned field to the container
                fieldsContainer.appendChild(newFieldWrapper);

                // Increment the counter for unique IDs and labels
                fieldCounter++;
            }
        }

        // Hide the button if the maximum number of fields is reached
        if (currentFieldsCount + 1 === maxFields) {
            addFieldButtonContainer.style.display = 'none';
        }
    });
});

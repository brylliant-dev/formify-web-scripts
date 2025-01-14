function getUrlParameters(paramNames, url = window.location.href) {
  const params = new URLSearchParams(new URL(url).search);
  const result = {};

  paramNames.forEach((paramName) => {
    result[paramName] = params.get(paramName);
  });

  return result;
}

// Example usage:
const paramNames = ['agencyId'];

// Extract parameters from the current URL
const extractedParams = getUrlParameters(paramNames);

const fieldIds = {
  agencyId: ['agency-id'],
};

setTimeout(() => {
  // Check if agencyId exists, if not redirect to home
  if (!extractedParams.agencyId) {
    window.location.href = '/'; // Redirect to home page
  } else {
    // Use jQuery to populate the fields
    $.each(extractedParams, (key, value) => {
      if (value) {
        fieldIds[key].forEach((id) => {
          $(`#${id}`).val(value);
        });
      }
    });
  } 
}, 200)

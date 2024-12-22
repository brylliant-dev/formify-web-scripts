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

// Extract parameters from current URL
const extractedParams = getUrlParameters(paramNames);

const fieldIds = {
  agencyId: ['agency-id'],
};

// Use jQuery to populate the fields
$.each(extractedParams, (key, value) => {
  if (value) {
    fieldIds[key].forEach(id => {
      $(`#${id}`).val(value);
    })
  }
});

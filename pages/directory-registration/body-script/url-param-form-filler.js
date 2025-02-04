function getUrlParameters(paramNames, url = window.location.href) {
  const params = new URLSearchParams(new URL(url).search);
  const result = {};

  paramNames.forEach((paramName) => {
    result[paramName] = params.get(paramName);
  });

  return result;
}

// Example usage:
const paramNames = [
  'formifyRequestId',
  'companyName',
  'country',
  'city',
  'firstName',
  'lastName',
  'email',
  'phone',
];

// Extract parameters from current URL
const extractedParams = getUrlParameters(paramNames);

const fieldIds = {
  formifyRequestId: ['formify-request-id'],
  companyName: ['company-name', 'agency-name'],
  country: ['country'],
  city: ['city'],
  firstName: ['first-name'],
  lastName: ['last-name'],
  email: ['email'],
  phone: ['phone'],
};

// Use jQuery to populate the fields
$.each(extractedParams, (key, value) => {
  if (value) {
    fieldIds[key].forEach(id => {
      $(`#${id}`).val(value);
    })
  }
});

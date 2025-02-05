var Webflow = Webflow || []
Webflow.push(function () {
  const caseStudyImageName = 'Case-Study-Image'
  const formElementId = 'wf-form-Case-Study'

  const showLoadingGif = () => {
    $('.section-partner-hero').hide()
    $('#loading-svg-section').show()
  }

  const hideLoadingGif = () => {
    $('.section-partner-hero').show()
    $('#loading-svg-section').hide()
  }

  // Display error message
  function displayError(message) {
    hideLoading()
    failureMessage.innerText = message
    failureMessage.style.display = 'block'
  }

  function hideError() {
    failureMessage.innerText = ''
    failureMessage.style.display = 'none'
  }

  function hideLoading() {
    showForm()
    successMessage.style.display = 'none'
  }

  function hideForm() {
    form.style.display = 'none'
  }

  function showLoading() {
    hideForm()
    successMessage.style.display = 'block'
    hideError()
  }

  function showForm() {
    form.style.display = 'grid'
    hideError()
  }

  function addListeners(xhr) {
    xhr.addEventListener('loadstart', function () {
      showLoading()
      showLoadingGif() // Show loading animation when request starts
    })
  }

  function addSettings(xhr) {
    xhr.timeout = requestTimeout
  }

  function triggerSubmit(event) {
    event.preventDefault() // Prevent default form submission

    let formData = new FormData(event.target)

    // Validate that the file input has a file
    const fileInput = event.target.querySelector(
      `input[name="${caseStudyImageName}"]`,
    )

    // `fileUploadSkip` constant is shared from `auto-fill-case-study-form.js`, remember to copy/move this file with it
    if (!fileInput.files.length && !fileUploadSkip) {
      displayError('Please upload a file.')
      return
    }

    let xhr = new XMLHttpRequest()
    xhr.open('POST', event.srcElement.action)
    addListeners(xhr)
    addSettings(xhr)

    // Show loading when request starts
    xhr.onloadstart = function () {
      showLoadingGif()
      console.log('Request started...')
    }

    // Update loading progress
    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        let percentComplete = (event.loaded / event.total) * 100
        console.log(`Loading... ${percentComplete.toFixed(2)}%`)
      } else {
        console.log('Loading... Received', event.loaded, 'bytes')
      }
    }

    // Capture XHR response
    xhr.onload = function () {
      console.log('XHR Load:', xhr)
      hideLoadingGif() // Hide loading animation when done

      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        console.log('Success:', data)
      } else {
        displayError(errorMessage)
      }
    }

    // Handle request timeout
    xhr.ontimeout = function () {
      displayError(errorMessageTimedOut)
      hideLoadingGif()
    }

    // Handle network errors
    xhr.onerror = function () {
      displayError('Network error. Please check your connection.')
      hideLoadingGif()
    }

    xhr.send(formData)
  }

  // Form reference
  const form = document.getElementById(formElementId)
  let failureMessage = document.getElementById('error-message')
  let successMessage = document.getElementById('success-message')
  let requestTimeout = 30000 // 30 seconds timeout
  let errorMessageTimedOut = 'Oops! Seems this timed out. Please try again.'
  let errorMessage = 'Oops! Something went wrong. Please try again.'

  // Attach form submit event
  form.addEventListener('submit', triggerSubmit)
})

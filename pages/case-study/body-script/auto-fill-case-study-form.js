let fileUploadSkip = false // This variable is shared to `form-webhook.js`, remember to copy/move this file with it

const caseStudyImageId = '#Case-Study-Image'

$(caseStudyImageId).on('change', (event) => {
  const showLoadingGif = () => {
    $('.section-partner-hero').hide()
    $('#loading-svg-section').show()
  }

  const hideLoadingGif = () => {
    $('.section-partner-hero').show()
    $('#loading-svg-section').hide()
  }

  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const imgPreview = $('#img-upload')
      imgPreview.attr('src', e.target.result) // Assign the Base64 result to src
      imgPreview.show() // Ensure the image is visible
      $('#file-upload-wrapper').removeClass('hide')
    }

    reader.readAsDataURL(file) // Read the file as a Data URL
  }
})

// Function to get URL parameters
const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param) // Returns the value of the parameter or null if not present
}

// Function to send the POST request
const sendStudyId = (studyId) => {
  // Create a FormData object
  const formData = new FormData()
  formData.append('study-id', studyId) // Add the study-id from the URL params

  // Use jQuery to send the POST request
  $.ajax({
    // url: 'https://hook.eu2.make.com/msndf1zbfesqoeb4cwx7lrik0fl2ahkx',
    url: 'https://hook.eu2.make.com/3hcg4kscxx1q9k1k9kjvamaget87yd4j',
    type: 'POST',
    data: formData,
    processData: false, // Prevent jQuery from automatically processing FormData
    contentType: false, // Prevent jQuery from setting a content-type header
    beforeSend: function () {
      // Show loading indicator before sending request
      showLoadingGif()
    },
    success: (response) => {
      console.log('Success:', response) // Log the response data
      //const data = JSON.parse(response)
      if (response === 'Accepted') return

      $('#add-update-heading').text('Update')

      const data = JSON.parse(response)
      console.log('Data:', data)
      $('input#study-id').attr('value', data?.itemId)
      $('input#study-title').attr('value', data?.studyTitle)
      $('input#summary-title').attr('value', data?.summary)

      if (data?.description && data?.description !== '') {
        quill.clipboard.dangerouslyPasteHTML(0, data?.description)
      }

      ;[...(data?.services ?? [])].forEach((slug) => {
        $(`input[name=${slug}]`).click()
      })

      if (data?.mainImage && data?.mainImage !== '') {
        const imgPreview = $('#img-upload')
        const inputImage = $('input#Case-Study-Image')
        imgPreview.attr('src', data?.mainImage) // Assign the Base64 result to src
        imgPreview.show() // Ensure the image is visible
        inputImage.removeAttr('required')
        inputImage.attr('data-image-url', data?.mainImage)
        $('#file-upload-wrapper').removeClass('hide')

        fileUploadSkip = true
      }

      const addFieldButton = $('#add-field-button')

      const sixArray = [1, 2, 3, 4, 5, 6]

      sixArray.forEach((num) => {
        if (data?.[`youtubeVideo${num}`]) {
          if (num > 1) {
            addFieldButton.get()[0].click()
          }
          $(`input[name="Youtube-Video-${num}"]`).get()[0].value =
            data?.[`youtubeVideo${num}`]
        }
      });

      if (data?.isDraft) {
        $('#subheading-message').show()
      }

      // $('#editor .ql-editor p').html(`${data?.description}`)
    },
    error: (xhr, status, error) => {
      console.error('Error:', error) // Log any errors
    },
    complete: () => {
      hideLoadingGif()
    },
  })
}

// Check if the URL contains a `studyId` parameter
const studyId = getQueryParam('studyId')
if (studyId) {
  // Run sendStudyId if studyId is present in the URL
  sendStudyId(studyId)
} else {
  console.log('No studyId found in URL parameters.')
}

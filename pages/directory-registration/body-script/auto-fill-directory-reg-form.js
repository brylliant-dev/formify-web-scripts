let fileUploadSkip = false // This variable is shared to `form-webhook.js`, remember to copy/move this file with it

const agencyLogoImage = '#Agency-Logo'

$(agencyLogoImage).on('change', (event) => {
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
const sendAgencyId = (agencyId) => {
  const showLoadingGif = () => {
    $('.section-partner-hero').hide()
    $('#loading-svg-section').show()
  }
  
  const hideLoadingGif = () => {
    $('.section-partner-hero').show()
    $('#loading-svg-section').hide()
  }
  // Create a FormData object
  const formData = new FormData()
  formData.append('agency-id', agencyId) // Add the agency-id from the URL params

  // Use jQuery to send the POST request
  $.ajax({
    url: 'https://hook.eu2.make.com/ybgygnkb3tcwrbfb3jlxiuk54bijycnj',
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

      $('#add-update-heading').text('Update AI Agency')

      const data = JSON.parse(response)
      console.log('Data:', data)
      $('input#agency-id').attr('value', data?.itemId)
      $('input#agency-name').attr('value', data?.agencyName)
      $('textarea#about').val(data?.about)
      $('select#country').val(data?.location)
      $('input#city').attr('value', data?.city)
      $('input#first-name').attr('value', data?.firstName)
      $('input#last-name').attr('value', data?.lastName)
      $('input#email').attr('value', data?.email)
      $('input#email-orig').attr('value', data?.email)
      $('input#phone').attr('value', data?.phoneNumber)
      $('input#company-name').attr('value', data?.companyName)
      $('input#Agency-URL').attr('value', data?.agencyUrl)
      $('select#partner-size').val(data?.size)
      $('select#Agency-Type').val(data?.agencyType)

      const servicesArray = [...(data?.services ?? [])]
      const languagesArray = [...(data?.languages ?? [])]

      servicesArray.forEach((slug) => {
        $(`input[name=${slug}]`).click()
      })

      languagesArray.forEach((slug) => {
        $(`input[name=${slug}]`).click()
      })

      const addFieldButton = $('#add-field-button')

      const sixArray = [1, 2, 3, 4, 5, 6]
      const clientLogos = data?.clientLogos

      if (data?.agencyLogo && data?.agencyLogo !== '') {
        const imgPreview = $('#img-upload')
        const inputImage = $(`input${agencyLogoImage}`)
        imgPreview.attr('src', data?.agencyLogo) // Assign the Base64 result to src
        imgPreview.show() // Ensure the image is visible
        inputImage.removeAttr('required')
        inputImage.attr('data-image-url', data?.agencyLogo)
        $('#file-upload-wrapper').removeClass('hide')

        fileUploadSkip = true
      }

      if(clientLogos && clientLogos.length > 0) {
        for(let i = 0; i < clientLogos.length; i++) {
          const num = i + 1

          const imgPreview = $(`#img-upload-${num}`)
          const inputImage = $(`input#client-logo-${num}`)
          imgPreview.attr('src', clientLogos[i]) // Assign the Base64 result to src
          imgPreview.show() // Ensure the image is visible
          inputImage.removeAttr('required')
          inputImage.attr('data-image-url', clientLogos[i])
          $(`#file-upload-wrapper-${num}`).removeClass('hide')
        }
      }

      sixArray.forEach((num) => {
        const imgPreview = $(`#img-upload-${num}`)
        const inputImage = $(`input#client-logo-${num}`)

        $(inputImage).on('change', (event) => {
          const file = event.target.files[0]
          if (file) {
            const reader = new FileReader()
        
            reader.onload = (e) => {
              imgPreview.attr('src', e.target.result) // Assign the Base64 result to src
              imgPreview.show() // Ensure the image is visible
              $(`#file-upload-wrapper-${num}`).removeClass('hide')
            }
        
            reader.readAsDataURL(file) // Read the file as a Data URL
          }
        })
      });

      sixArray.forEach((num) => {
        if (data?.[`youtubeVideo${num}`]) {
          if (num > 1) {
            addFieldButton.get()[0].click()
          }

          const suffix = `${num > 1 ? `-${num}` : ''}`
          const target = `input[name="Youtube-Video${suffix}"]`

          $(target).get()[0].value =
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

// Check if the URL contains a `agencyId` parameter
const agencyId = getQueryParam('agencyId')
if (agencyId) {
  // Run sendAgencyId if agencyId is present in the URL
  sendAgencyId(agencyId)
} else {
  console.log('No agencyId found in URL parameters.')
}

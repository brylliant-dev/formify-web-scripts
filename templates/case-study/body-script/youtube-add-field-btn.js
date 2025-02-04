$('.agency_content_main_contact').on('click', function(){
    $('.body-v2').addClass('no-scroll');
  });
  
  $('.videos-popup_close, .contact-popup_bg').on('click', function(){
    $('.body-v2').removeClass('no-scroll');
  });
  
  // Select the parent element with the specified class
  const parentElement = document.querySelector('.agency_content_main_website');
  
  // Check if the parent element exists and contains an <a> tag
  if (parentElement) {
      const childAnchor = parentElement.querySelector('a');
      if (childAnchor) {
          // Add the attribute to open the link in a new tab
          childAnchor.setAttribute('target', '_blank');
      }
  }

  /**
   * 
   * In Between should be the Case Study and Agency ID (from CMS items backup code)
   * 
   * Look for this in Webflow custom code on top of the import:
   * 
   * 	$('#case-study_update')[0].href += '?agencyId=| Agency: Agency ID |&studyId=| Case Study ID |'
   * 
   */

  document.addEventListener('DOMContentLoaded', function () {
    // Get all the video link elements (for multiple YouTube videos)
    const videoLinks = document.querySelectorAll('.thumbnail-container');
    const popupWrapper = document.querySelector('.videos-popup_wrapper');
    const videoEmbed = document.querySelector('.videos-popup_yt');
    const closeButton = document.querySelector('.videos-popup_close');
    const background = document.querySelector('.videos-popup_bg');

    let player; // YouTube Player instance

    // Function to load YouTube IFrame API script
    function loadYouTubeAPI() {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player inside the videos-popup_yt container
    window.onYouTubeIframeAPIReady = function () {
      player = new YT.Player(videoEmbed, {
        events: {
          onReady: () => console.log('YouTube Player ready')
        }
      });
    };

    loadYouTubeAPI();
    
    function getURLParams(url) {
   			if(!url) return null
        const params = new URL(url)
        const searchParams = params ? params.searchParams : null;
        
        if(!searchParams) return null
        const obj = {};

        for (const [key, value] of searchParams.entries()) {
            obj[key] = value;
        }

        return obj;
    }



    videoLinks.forEach((link) => {
      // Get the full YouTube URL from the data attribute
      const videoUrl = link.getAttribute('data-video-link');
      
      const output = getURLParams(videoUrl);
      const videoId = output?.v;

      // Update the thumbnail image source with the correct video ID
      const thumbnailImage = link.querySelector('img');
      if (videoId && thumbnailImage) {
        thumbnailImage.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }

      // Handle the click event to open the popup with the video
      link.addEventListener('click', function (event) {
        event.preventDefault();

        // Load the video into the player
        if (player) {
          player.loadVideoById(videoId);
          player.playVideo();
        }

        // Show the popup
        popupWrapper.style.display = 'flex';
      });
    });

    // Close the popup when the 'X' button or background is clicked
    function closePopup() {
      if (player) {
        player.pauseVideo(); // Pause the video
      }

      popupWrapper.style.display = 'none';
    }

    closeButton.addEventListener('click', closePopup);
    background.addEventListener('click', closePopup);

    // Function to extract the YouTube video ID from a URL
    function getYoutubeID(url) {
      const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }
  });

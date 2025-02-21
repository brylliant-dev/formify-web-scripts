const checkMember = async () => {
  const memberstack = window.$memberstackDom

  await memberstack.getCurrentMember().then((r) => {
    if (!r.data?.id) {
      window.location.href = "/"
    } else {
      const caseStudyButton = document.getElementById("case-study_update-wrapper")

      const agencyContentTag = document.getElementById("agency_content_tag")
      const editAgencyButton = document.getElementById("edit-agency-button")

      const cmsMemberstackIdElement = document.getElementById("memberstack-id")
      const cmsMemberstackId = cmsMemberstackIdElement
        ? cmsMemberstackIdElement.textContent.trim()
        : null

      const loggedInMemberstackId = r.data?.id ?? null

      if (cmsMemberstackId === loggedInMemberstackId) {
        caseStudyButton.style.display = "block"
        editAgencyButton.style.display = "block"
        agencyContentTag.classList.add('ml-16')
        //console.log("IDs match. Showing button");

      } else {
        //caseStudyButton.style.display = 'none';
        caseStudyButton.remove()
        editAgencyButton.remove()
        //console.log("IDs do not match...");
      }
      //console.log("CMS Memberstack ID:", cmsMemberstackId);
      //console.log("Logged-in Memberstack ID:", loggedInMemberstackId);
    }
  })
}

checkMember()

const checkMember = async () => {
  const memberstack = window.$memberstackDom

  await memberstack.getCurrentMember().then((r) => {
    if (!r.data?.id) {
      window.location.href = "/"
    } else {
      const caseStudyButton = document.getElementById("case-study_update-wrapper")

      const cmsMemberstackIdElement = document.getElementById("memberstack-id")
      const cmsMemberstackId = cmsMemberstackIdElement
        ? cmsMemberstackIdElement.textContent.trim()
        : null

      const loggedInMemberstackId = r.data?.id ?? null

      if (cmsMemberstackId === loggedInMemberstackId) {
        caseStudyButton.style.display = "block"
      } else {
        caseStudyButton.remove()
      }
    }
  })
}

checkMember()

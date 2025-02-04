const memberstack = window.$memberstackDom

const checkMember = async () =>
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
        //console.log("IDs match. Showing button");
      } else {
        //caseStudyButton.style.display = 'none';
        caseStudyButton.remove()
        //console.log("IDs do not match...");
      }
      //console.log("CMS Memberstack ID:", cmsMemberstackId);
      //console.log("Logged-in Memberstack ID:", loggedInMemberstackId);
    }
  })

checkMember()

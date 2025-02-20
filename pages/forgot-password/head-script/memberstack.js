const memberstack = window.$memberstackDom

const redirectNonLogin = async () =>
  await memberstack.getCurrentMember().then((r) => {
    if (!r.data?.id) {
      window.location.href = "/"
    } 
  })

redirectNonLogin()

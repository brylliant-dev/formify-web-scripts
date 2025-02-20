const redirectNonLogin = async () => {
  const memberstack = window.$memberstackDom

  await memberstack.getCurrentMember().then((r) => {
    if (!r.data?.id) {
      window.location.href = "/"
    } 
  })
}

redirectNonLogin()

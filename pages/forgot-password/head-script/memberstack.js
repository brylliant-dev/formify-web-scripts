const memberstack = window.$memberstackDom

const redirectNonLogin = async () =>
  await memberstack.getCurrentMember().then((r) => {
    if (!r.data?.id) {
      window.location.href = "/"
    } else {
      $('#Mem-ID').val(r.data.id)
    }
  })

redirectNonLogin()

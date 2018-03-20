function handlePage(serverPage){
  if(serverPage)
    return {
      current:serverPage.current,
      total:serverPage.total,
      pageSize:serverPage.size,
    }
  return {
    current:1,
    total:0,
    pageSize:1,
  }
}

export default handlePage
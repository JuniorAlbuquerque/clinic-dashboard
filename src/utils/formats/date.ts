export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

export const brStringToDate = (date: string) => {
  const day = date.split('/')[0]
  const month = date.split('/')[1]
  const year = date.split('/')[2]

  const parsedDate =
    year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2)

  return new Date(parsedDate)
}

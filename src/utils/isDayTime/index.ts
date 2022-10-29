export const dayTime = () => {
  const hours = new Date().getHours()

  const isDayTime = hours > 5 && hours < 18

  const saudation = isDayTime ? 'Bom dia' : 'Boa noite'

  return {
    isDayTime,
    saudation
  }
}

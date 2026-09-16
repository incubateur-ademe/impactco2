export const formatCalendarDates = (startDate: Date, endDate: Date | null) => {
  const formattedStartDate = startDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return endDate
    ? `${formattedStartDate} au ${endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`
    : formattedStartDate
}

const normalizeZip = (value) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  return `${onlyNums.slice(0, 5)}`
}

export default normalizeZip

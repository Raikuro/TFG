exports._diffBtwKeywordArrays = (arr1, arr2) => {
  return arr1.filter((element) => {
    return arr2.indexOf(element) < 0
  })
}

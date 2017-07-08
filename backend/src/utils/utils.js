exports.diffBtwKeywordArrays = (arr1, arr2) => {
  return arr1.filter((element) => {
    return arr2.indexOf(element) < 0
  })
}

exports.diffBtwTestOptionArrays = (arr1, arr2) => {
  return arr1.filter(e1 => {
    return !arr2.some(e2 => {
      return JSON.stringify({answer: e2.answer, isCorrect: e2.isCorrect}) ===
      JSON.stringify({answer: e1.answer, isCorrect: e1.isCorrect})
    })
  })
}

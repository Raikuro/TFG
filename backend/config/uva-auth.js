function getCollegeAlumns () {
  return [
    {
      username: 'asd',
      password: 'asd'
    }
  ]
}

function getCollegeTeachers () {
  return [
    {
      username: 'qwe',
      password: 'qwe'
    }
  ]
}

exports.getCollegeUser = (user, pass) => {
  let collegeUsers = getCollegeAlumns()
  let userFind = collegeUsers.find((element) => {
    return (element.username === user && element.password === pass)
  })
  if (userFind) {
    userFind.isAlumn = true
  } else {
    collegeUsers = getCollegeTeachers()
    userFind = collegeUsers.find((element) => {
      return (element.username === user && element.password === pass)
    })
    if (userFind) {
      userFind.isAlumn = false
    }
  }

  return userFind
}

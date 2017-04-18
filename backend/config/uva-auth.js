exports.existAtCollege = (user, pass) => {
  return _existAtCollege(user, pass);
}

_existAtCollege = (user, pass) => {
  return (req, res, next) => {
    let collegeUsers = getCollegeUsers();
    let userFind = collegeUsers.find( (e) => {
      return (e.username === user && e.password === pass)
    })
    if(userFind !== undefined){
      next();
    }
  }
}

getCollegeUsers = () => {
  return [
    { username: "asd", password: "asd"},
    { username: "qwe", password: "qwe"}
  ]
}
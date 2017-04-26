exports.findByUsername = function(username, cb) {
  process.nextTick(function() {

    let records = getUserList();

    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

getUserList = () => {
  return [
    { username: "asd", displayName: "yopasd"},
    { username: "qwe", displayName: "yopqwe"}
  ];
}
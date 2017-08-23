const moment = require('moment');

module.exports = function(app) {
  app.get('/:query', (req, res) => {
    let date = req.params.query;
    let unixDt = null;
    let naturalDt = null;

    if (+date >= 0) {
      unixDt = +date;
      naturalDt = unixToNat(unixDt);
    }

    // Check for initial natural time
    if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
      unixDt = +natToUnix(date);
      naturalDt = unixToNat(unixDt);
    }

    var result = { "unix": unixDt, "natural": naturalDt };
    res.send(result);
  });

  // Convert unix timestamp to natural date
  function unixToNat(unixDt) {
    return moment.unix(unixDt).format("MMMM D, YYYY");
  }

  // Conver from natural date to unix timestamp
  function natToUnix(date) {
    return moment(date, "MMMM D, YYYY").format("X");
  }
};

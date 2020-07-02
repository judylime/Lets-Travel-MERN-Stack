exports.homePage = (req, res) => {
  res.render('index', { title: "Let's Travel" });
}

exports.listAllHotels = (req, res) => {
  res.render('all_hotels', { title: "All Hotels" });
}



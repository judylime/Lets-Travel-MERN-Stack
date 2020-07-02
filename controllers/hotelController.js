exports.homePage = (req, res) => {
  res.render('index', { title: "Let's Travel" });
}

exports.listAllHotels = (req, res) => {
  res.render('all_hotels', { title: "All Hotels" });
}


exports.signUp =(req,res,next) => {
  console.log('sign up middleware');
  //validate user info
  // next()
}

exports.logIn = (req,res) =>{
  console.log('log in middleware');
  //login
}
const Hotel = require('../models/hotel');
const { NotExtended } = require('http-errors');

exports.homePage = (req, res) => {
  res.render('index', { title: "Let's Travel" });
}

exports.listAllHotels = (req, res) => {
  res.render('all_hotels', { title: "All Hotels" });
}

exports.adminPage = (req,res)=>{
  res.render('admin',{titile:"Admin"});
}

exports.createHotelGet =(req,res) =>{
  res.render ('add_hotel', {title: 'Add new hotel'});
}

exports.createHotelPost = async (req,res,next) => {
  try{
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.redirect(`/all/${hotel._id}`);
  } catch (error){
    next(error)
  }
}
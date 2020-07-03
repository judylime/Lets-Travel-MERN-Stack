const Hotel = require('../models/hotel');
// const { NotExtended } = require('http-errors');

// exports.homePage = (req, res) => {
//   res.render('index', { title: "Let's Travel" });
// }

exports.listAllHotels = async (req, res,next) => {
  try{
    const allHotels = await Hotel.find({ available:{ $eq: true }});
    res.render('all_hotels', { title: "All Hotels",allHotels });
    // res.json(allHotels);
  } catch (error){
    next(error)
  }
}

exports.listAllCountries = async (req,res,next) =>{
  try {
    const allCountries = await Hotel.distinct('country');
    res.render('all_countries', {title: 'Browse by country', allCountries});
  }catch (error) {
    next(error)
  }
}

exports.homePageFilters = async (req,res,next) =>{
  try{
    const hotels =await Hotel.aggregate([
      {$match:{ available:true}},
      {$sample:{ size:9 }}
    ]);
    const countries = Hotel.aggregate([
      { $group: {_id: '$country'}},
      { $sample: { size: 9 }}
    ]);
    res.render('index', { countries, hotels});
  } catch(error) {
    next(error)
  }
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
  } catch (errors){
    next(error)
  }
}

exports.editRemoveGet = ( req,res) =>{
  res.render('edit_remove', {title:'Search for hotel to edit or remove'})
}

exports.editRemovePost = async (req, res, next) =>{
  try{
    const hotelId = req.body.hotel_id || null;
    const hotelName = req.body.hotel_name || null;
    
    const hotelData = await Hotel.find({$or: [
      { _id: hotelid },
      { hotel_name: hotelName}
    ]}).collation({
      locale:'en',
      strength: 2
    });

    if(hotelData.length >0) {
      res.render('hotel_detail', {title:'Add / Remove Hotel', hotelData});
      return
    } else [
      res.redirect('/admin/edit-remove')
    ]
  }catch(errors){
    next(next)
  }
}

exports.updateHotelGet = async (req, res, next) => {
  try {
    const hotel =await Hotel.findOne({ _id: req.params.hotelId });
    res.render ('add_hotel', { title: 'Update hotel',hotel });
  } catch (error) {
    next(error)
  }
}

exports.updateHotelPost = async (req,res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findByIdAndUpdate(hotelId,req.body, {new:true});
    res.redirect(`/all/${hotelId}`)
  }catch (error) {
    next(error)
  }
}

exports.deleteHotelGet = async (req, res,next) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findOne( {_id: hotelId} );
    res.render('add_hotel', { title: 'Delete hotel', hotel});
  } catch (error){
    next(error)
  }
};


exports.deleteHotelPost = async (req, res,next) => {
  try{
    const hotelId = req.params.hotelId
    const hotel = await Hotel.findByIdAndRemove( {_id: hotelId} );
    req.flash('info', `Hotel ID: ${hotelId} has been deleted`);
    res.redirect('/')
  }catch (error) {
    next(error)
  }
};
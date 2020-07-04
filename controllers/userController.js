const User = require('../models/user');
const Passport = require('passport');

//Express validator
const {check, validationResult} =require ('express-validator/check');
const {sanitize} = require('expresss-validator/filter');

exports.signUpGet = (req, res) => {
  res.render('sign_up', {title:'User sign up'});
}
exports.signUpPost = [
  //Validate data
  check('first_name').isLength({ min: 1 }).withMessage('First name must be specified.')
  .isAlphanumeric().withMessage('First name must be alphanumeric.'),

  check('surname').isLength({ min: 1 }).withMessage('Surname must be specified.')
  .isAlphanumeric().withMessage('Surname must be alphanumeric.'),

  check('email').isEmail().withMessage('Invalid email address'),

  check('confirm_email')
  .custom((value, { req }) => value === req.body.email)
  .withMessage('Email addresses do not match'),

  check('password').isLength({ min: 6 }).withMessage('Invalid password, passwords must be a minimum of 6 characters'),

  check('confirm_password')
  .custom((value, { req }) => value === req.body.password)
  .withMessage('Passwords do not match'),

  sanitize('*').trim().escape(),

  (req, res, next) => {
  const errors = validationResult(req);

exports.signUpGet = (req, res) => {
  res.render('sign_up', {title: 'User sign up'} );
}

if (!errors.isEmpty()) {
  //There are errors
  //res.json(req.body)
  res.render('sign_up', {title: 'Please fix the following errors:', errors: errors.array(), user: req.body});
  return;
} else {
  // No error

    const newUser = new User(req.body);

    User.register(newUser, req.body.password, function(err) {

    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    next();//Move onto loginPost after registering
  });
}
}
];

exports.loginGet = (req, res) => {
  res.render('login', {title: 'Login to continue'} );
};

exports.loginPost = Passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are now logged in!',
  failureRedirect: '/login',
  failureFlash: 'Login failed, please try again'
});


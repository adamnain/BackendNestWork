const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/userModel');
const { handler: errorHandler } = require('../../middleware/error');
const multer = require('multer');
const storages = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/images')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString()+file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storages,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

  const insertDocuments = function(id,filePath, callback) {
  User.findByIdAndUpdate({'_id':id},{'picture' : filePath }, (err, result) => {
      callback(result);
  });
}

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.update(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  const user = Object.assign(req.locals.user, updatedUser);

  user.save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(User.checkDuplicateEmail(e)));
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

/**
* upload user's avatar
*/

exports.uploadImageProfil = async (req, res, next)=>{
  const id = req.params.UserId;
  if(!req.file){
    res.status(404).json({message:'File is Empty'});
  }else{
    const linknya = 'http://localhost:3000/'+req.file.filename;
    console.log('input link');
    User.findByIdAndUpdate({'_id':id},{'avatarLink' : linknya }, (err, result) => {
      const fil = [req.file];
      insertDocuments(req.params.UserId, fil, (file)=>{
        res.status(200).json(file);
      return result;
      });
    });
  }
}

 /**
 * get user's avatar
 */
exports.avatar= async(req, res)=>{
  console.log("Get Avatar Image");
  const id = req.params.UserId;
  User.findById(id,function (err, data){
    if (err) return next(err);
    const file = data.avatarLink;
    console.log(file);
    res.status(200).json({file});
  });
};

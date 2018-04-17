const mongoose = require('mongoose');
const httpStatus = require('http-status');
const {omitBy, isNil} = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const {env, jwtSecret, jwtExpirationInterval} = require('../../config/variables');

/**
 * Present Schema
 * @private
 */
const cutiSchema = new mongoose.Schema({
    email:{
        type : String,
        index:true,        
    },
    nama:{
        type: String,
        index: true,
    },        
    awal_cuti:{
        type : Date,        
        index:true,        
    },
    akhir_cuti:{
        type: Date, 
        index:true,
    },
    keterangan:{
        type: String,
        index:true,          
    },
    respons:{
        type: Number,
        index: true,
        default: 0,
    },
    status:{
        type: Number,
        index : true,
        default : 0,
    },    
  }, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
cutiSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'email','nama','awal_cuti','akhir_cuti','keterangan', 'status', 'respons'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },  
});

/**
 * Statics
 */
/*cutiSchema.statics = {  

   * Get Present
   *
   * @param {ObjectId} id - The objectId of Present.
   * @returns {Promise<Present, APIError>}
   
  async get(email) {
    try {
      let cuti;

      if (mongoose.Types.String.isValid(email)) {
        cuti = await this.findOne({email:email}).exec();
      }
      if (cuti) {
        return cuti;
      }

      throw new APIError({
        message: 'cuti does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};*/

/**
 * @typedef User
 */
module.exports = mongoose.model('Cuti',cutiSchema);
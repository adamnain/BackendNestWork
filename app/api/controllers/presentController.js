const httpStatus = require('http-status');
const { omit } = require('lodash');
const Present = require('../models/presensi');
const { handler: errorHandler } = require('../../middleware/error');


/**
 * Post Present
 * @private
 */
exports.addPresent = async (req, res, next) => {
  	try{
  		const kehadiran = new Present(req.body);
   		const savedKehadiran = await kehadiran.save();        
        const PresentTransformed = savedKehadiran.transform();     
        res.status(httpStatus.CREATED);
        return res.json(PresentTransformed);
    }catch(error){
        return error;
    }
}
exports.getAllPresent = async (req, res) => {
	try{
		Present.find(function(err, present){
		if(err){
			res.send(err);
			console.log(err);
		}
		res.json(present);
	});
	}catch(error){
		return error;
	}
}

exports.getOnePresent = async (req, res) => {
	
}

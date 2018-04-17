const httpStatus = require('http-status');
const { omit } = require('lodash');
const Cuti = require('../models/cuti');
const { handler: errorHandler } = require('../../middleware/error');
/**
 * Post Present
 * @private
 */
exports.ajukanCuti = async (req, res) => {
  	try{
  		const cuti = new Cuti(req.body);
   		const savedcuti = await cuti.save();        
        const cutiTransformed = savedcuti.transform();     
        res.status(httpStatus.CREATED);
        const status = httpStatus.CREATED;
        const message = 'created';
        return res.json({message, status, cutiTransformed});
    }catch(error){
        return error;
    }
}

exports.getAllCuti = async (req, res) => {
	try{
		Cuti.find(function(err, cuti){
		if(err){
			res.send(err);
			console.log(err);
		}
		const message = 'OK'
		const status = httpStatus.OK;
		res.json({message, status, cuti});
	});
	}catch(error){
		return error;
	}
}

exports.accCuti = async (req, res) => {
	var id = req.params.id;
	var status  = 1;
	var respons = 1;
	Cuti.findOneAndUpdate({"_id" : id}, {"$set" : {"status" : status, "respons" : respons}}, {upsert:true}, function(err, cuti){
    	if(err){
			res.send(err);
			console.log(err);
		}
		const message = 'updated'
		const status = httpStatus.OK;
		res.json({message, status, cuti});
	});
}

exports.tolakCuti = async (req, res) => {
	var id = req.params.id;
	var status  = 0;
	var respons = 1;
	Cuti.findOneAndUpdate({"_id" : id}, {"$set" : {"status" : status, "respons" : respons}}, {upsert:true}, function(err, cuti){
    	if(err){
			res.send(err);
			console.log(err);
		}
		const message = 'updated'
		const status = httpStatus.OK;
		res.json({message, status, cuti});
	});
}

exports.findByEmail = function(req, res){
	const email = req.params.email;
	Cuti.find({'email' : email},
		function(err, cuti){
			if(err){
				res.send(err);
				console.log(err);
			}
			res.json(cuti);
	});
};
exports.findByStatus = function(req, res){
	const status = req.params.status;
	Cuti.find({'status' : status},
		function(err, cuti){
			if(err){
				res.send(err);
				console.log(err);
			}
			res.json(cuti);
		});
};
exports.findByRespons = function(req, res){
	const respons = req.params.respons;
	Cuti.find({'respons' : respons},
		function(err, cuti){
			if(err){
				res.send(err);
				console.log(err);
			}
			res.json(cuti);
	});
};

exports.destroyAll = function(req, res) {
    Cuti.remove({}, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json('success deleting all file');
            }
        });
};

exports.destroyByID = function(req, res){
	const id = req.params.id;
	Cuti.remove({"_id" : id}, function(err){
			if (err) {
				console.log(err);
			} else{
				res.json('success delete by id');
			}
	});
};
exports.dropCuti = function(req, res){
	Cuti.collection.drop(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json('success deleting all file');
            }
        });
};
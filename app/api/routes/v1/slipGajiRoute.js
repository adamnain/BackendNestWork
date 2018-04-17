const express = require('express');
const validate = require('express-validation');
const slipGajiController = require('../../controllers/slipGajiController')
const { authorize, ADMIN, LOGGED_USER } = require('../../../middleware/auth');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} = require('../../validations/user.validation');
const router = express.Router();
router
  .route('/ajukanSlipGaji')
  /**
   * @api {post} api/slipGaji/ajukanSlipGaji User's Salary Slip
   * @apiDescription post present user's
   * @apiVersion 1.0.0
   * @apiName UserSlipGaji
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}   email       email's user
   * @apiParam  {Date}   waktu   waktu pengajuan
   * @apiParam  {String}   status  status slip gaji
   * @apiParam  {String}   gaji   gaji
   *
   * @apiSuccess  {String}   email       email's user
   * @apiSuccess  {Date}   waktu   waktu pengajuan
   * @apiSuccess  {String}   status  status slip gaji
   * @apiSuccess  {String}   gaji   gaji
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
    .post(authorize(), slipGajiController.ajukanSlipGaji);
router.route('/getAllSlipGaji')
  /**
   * @api {get} api/slipGaji/getAllSlipGaji Get All User's Salary Slip
   * @apiDescription post present user's
   * @apiVersion 1.0.0
   * @apiName getAllUserSalarySlip
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess  {String}   email       email's user
   * @apiSuccess  {Date}   waktu   waktu pengajuan
   * @apiSuccess  {String}   status  status slip gaji
   * @apiSuccess  {String}   gaji   gaji
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), slipGajiController.getAllSlipGaji);
router.route('/getOneSlipGaji/:id').get(authorize(), slipGajiController.getOneSlipGaji);
module.exports = router;

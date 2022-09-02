var express = require("express");
const toolsControllers = require("../../contollers/tools.contoller");
const viewCount = require("../../middleware/viewCount");
var router = express.Router();
const limiter = require('../../middleware/limiter')

router
  .route("/")
  /**
   * @api {get} /tools all tools
   * @apiDescription Get all tools
   * @apiPermission admin
   * @apiHeader {string} Authorization  user's Access token
   * @apiParam {(Number{1})}   [page-1]     list-page
   * @apiParam {(Number{1-100})}   [limit-10]     user per page
   * @apiSuccess {Object[]}  all the tools
   * @apiError  (UnAuthorization 401)  Only Authenticated users can access the data
   * @apiError {'Forbidden 403 }   Forbidden   Only admin can access the data
   */
  .get(toolsControllers.getAllTools)
  /**
   * @api {post} / save a tools
   * @apiDescription Get all tools
   * @apiPermission admin
   * @apiHeader {string} Authorization  user's Access token
   * @apiParam {(Number{1})}   [page-1]     list-page
   * @apiParam {(Number{1-100})}   [limit-10]     user per page
   * @apiSuccess {Object[]}  all the tools
   * @apiError  (UnAuthorization 401)  Only Authenticated users can access the data
   * @apiError {'Forbidden 403 }   Forbidden   Only admin can access the data
   */
  .post(toolsControllers.saveATools);

router.route("/:id").get(viewCount, limiter, toolsControllers.toolsDetails).patch(toolsControllers.updateTools).delete(toolsControllers.deleteTools)

module.exports = router;

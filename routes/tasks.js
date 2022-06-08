const router = require("express").Router();
const tasks = require("../controllers/tasks");
const { upload } = require("../middleware/multer");
const {
  validateTask,
  validateStatusTask,
  validateStatus,
  isValidated,
} = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Home Create
 * @method get get Home By Id
 * @method put update Home
 */
//Post
router.post(
  "/",
  upload.single("photo"),
  validateTask,
  isValidated,
  tasks.create
);
//Read
router.get("/", tasks.getAll);
router.get("/:taskId", tasks.getById);
router.get("/getByServantId/:servantId", tasks.getByServantId);
router.get("/getByHomeId/:homeId", tasks.getByHomeId);
router.post("/getByStatus", validateStatus, isValidated, tasks.getByStatus);
//update
router.put(
  "/:taskId",
  upload.single("photo"),
  validateTask,
  isValidated,
  tasks.update
);
//accept Task
router.post("/changeStatus", validateStatusTask, isValidated, tasks.changeTask);

module.exports = router;
//

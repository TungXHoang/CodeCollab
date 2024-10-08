import express, { Router } from "express";
import { saveProject,getUserProjects, getProject, createProject, deleteProject, shareProject, updateProject } from "../controllers/projects"

const router: Router = express.Router();

router.route("/").post(createProject).delete(deleteProject);
router.route("/share").post(shareProject);
router.route("/:userId").get(getUserProjects)
router.route("/single/:projectId").get(getProject)
router.route("/update").post(updateProject)
router.route("/save").post(saveProject)

export = router;
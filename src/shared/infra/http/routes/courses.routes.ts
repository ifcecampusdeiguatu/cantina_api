import { Router } from "express";

import { CreateCoursesController } from "@modules/courses/useCases/createCourse/CreateCoursesController";
import { ListCoursesController } from "@modules/courses/useCases/listCourses/ListCoursesController";

const createCoursesController = new CreateCoursesController();
const listCoursesController = new ListCoursesController();

const coursesRoutes = Router();

coursesRoutes.post("/", createCoursesController.handle);
coursesRoutes.get("/", listCoursesController.handle);

export { coursesRoutes };

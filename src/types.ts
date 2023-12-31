interface Entity {
  id: string;
}

export interface Image extends Entity {
  src: string;
  alt: string;
}

export interface Order extends Entity {
  order: number;
}

/***********************
 * Main Menu
 */

export interface MainMenuData extends Entity {
  title: string;
  link: string;
  description: string;
}

export interface ProjectCategory extends Entity {
  order: number;
  title: string;
  description: string;
  numProjects: number;
  sortedBy: "auto" | "manual";
}

export interface ProjectCategoryWithProjects extends ProjectCategory {
  projects: Project[];
}

export type NewProjectCategory = Omit<ProjectCategory, "id" | "numProjects">;

export interface Project extends Entity {
  order: number;
  title: string;
  description: string;
  github: string;
  demo: string;
  image: Image;
}

export type NewProject = Omit<Project, "id" | "image"> & {
  image: File;
};

export type EditedProjectData = Omit<Project, "image"> & {
  image: Image | File;
};

/*************************
 * API Calls
 */

// Admin Login

export type AdminLoginInfo = {
  email: string;
};

export type AdminLoginRequest = {
  type: "admin-login";
  payload: {
    email: string;
    password: string;
  };
};

// Project Requests
export type ProjectRequest =
  | {
      type: "delete-project";
      payload: string;
    }
  | {
      type: "update-projects-order";
      payload: Order[];
    };
// update and add are performed through request.formData() --> no need for payload

export type ProjectCategoryRequest =
  | {
      type: "add-project-category";
      payload: NewProjectCategory;
    }
  | {
      type: "update-project-category";
      payload: ProjectCategory;
    }
  | {
      type: "delete-project-category";
      payload: string;
    }
  | {
      type: "update-project-categories-order";
      payload: Order[];
    };

/*********************
 * API Responses
 */
type Response<T> =
  | {
      errorMessage: null;
      payload: T;
    }
  | {
      errorMessage: string;
      payload: null;
    };

// Project Responses
export type ProjectResponse = Response<Project>;
export type ProjectsResponse = Response<Project[]>;

export type ProjectCategoryResponse = Response<ProjectCategory>;
export type ProjectCategoryWithProjectsResponse =
  Response<ProjectCategoryWithProjects>;
export type ProjectCategoriesResponse = Response<ProjectCategory[]>;

// Admin Login Response
export type AdminLoginResponse = Response<AdminLoginInfo>;

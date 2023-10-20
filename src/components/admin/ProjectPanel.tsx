"use client";

import { Project } from "@/types";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import Image from "next/image";
import sortProjects from "@/utils/sortProjects";
import getCategoryWithProjects from "@/api-calls/getCategoryWithProjects";

type Props = {
  categoryID: string;
};

export default function ProjectPanel({ categoryID }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortedBy, setSortedBy] = useState<"auto" | "manual">("manual");
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  useEffect(() => {
    getCategoryWithProjects(categoryID).then((category) => {
      setCategoryTitle(category.title);
      setSortedBy(category.sortedBy);

      const newProjectsSorted = sortProjects(
        category.projects,
        category.sortedBy
      );

      setProjects(newProjectsSorted);
    });
  }, [categoryID]);

  const onAdd = (newProject: Project) => {
    const newProjects = sortProjects([...projects, newProject], sortedBy);

    setProjects(newProjects);
  };

  const onEdit = (editedProject: Project) => {
    const newProjects = projects.map((project) => {
      if (project.id === editedProject.id) {
        return editedProject;
      }
      return project;
    });

    const newProjectsSorted = sortProjects(newProjects, sortedBy);

    setProjects(newProjectsSorted);
  };

  const onDelete = (deletedProject: Project) => {
    const newProjects = projects.filter(
      (project) => project.id !== deletedProject.id
    );

    const newProjectsSorted = sortProjects(newProjects, sortedBy);

    setProjects(newProjectsSorted);
  };

  return (
    <div>
      <h1>Project Panel</h1>
      <h2>Category: {categoryTitle}</h2>
      <AddProject onAdd={onAdd} sortedBy={sortedBy} categoryID={categoryID} />

      <div className="bg-blue-300">
        <p>Sorted by: {sortedBy}</p>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <div className="border border-blue-900 block p-2 hover:bg-gray-300">
                <p>{project.title}</p>
                <p>{project.description}</p>
                {sortedBy === "manual" && (
                  <p className="bg-red-200">{project.order}</p>
                )}
                <p>{project.github}</p>
                <p>{project.demo}</p>
                <div className="relative w-10 h-10">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    className="object-fill"
                  />
                </div>
                <div className="flex gap-2">
                  <EditProject
                    onEdit={onEdit}
                    project={project}
                    sortedBy={sortedBy}
                    categoryID={categoryID}
                  />
                  <DeleteProject onDelete={onDelete} project={project} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

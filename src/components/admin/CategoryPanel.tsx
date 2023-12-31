"use client";

import { CardWrapper, CardHeader, CardBody, CardFooter } from "./Card";

import { ProjectCategory } from "@/types";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import getProjectCategories from "@/api-calls/getProjectCategories";
import updateProjectCategoriesOrder from "@/api-calls/updateProjectCategoriesOrder";

import {
  useChangeOrder,
  ChangeOrderButtons,
  OrderInput,
} from "@/components/ChangeOrder";

export default function CategoryPanel() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);

  const {
    orders,
    setOrders,
    isChangeOrderOpen,
    setIsChangeOrderOpen,
    onSubmitOrder,
    onOrderChange,
    onCancelChangeOrder,
  } = useChangeOrder({
    items: categories,
    setItems: setCategories,
    updateOrder: updateProjectCategoriesOrder,
  });

  useEffect(() => {
    getProjectCategories({
      withProjects: true,
    }).then((categories) => {
      categories.sort((a, b) => a.order - b.order);
      setCategories(categories);

      setOrders(
        categories.map((category) => ({
          order: category.order,
          id: category.id,
        }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAdd = (newCategory: ProjectCategory) => {
    const newCategories = [...categories, newCategory];
    newCategories.sort((a, b) => a.order - b.order);

    setCategories(newCategories);

    setOrders(
      newCategories.map((category) => ({
        order: category.order,
        id: category.id,
      }))
    );
  };

  const onEdit = (editedCategory: ProjectCategory) => {
    const newCategories = categories.map((category) => {
      if (category.id === editedCategory.id) {
        return editedCategory;
      }

      return category;
    });

    newCategories.sort((a, b) => a.order - b.order);

    setCategories(newCategories);

    setOrders(
      newCategories.map((category) => ({
        order: category.order,
        id: category.id,
      }))
    );
  };

  const onDelete = (deletedCategory: ProjectCategory) => {
    const newCategories = categories.filter(
      (category) => category.id !== deletedCategory.id
    );

    newCategories.sort((a, b) => a.order - b.order);

    setCategories(newCategories);

    setOrders(
      newCategories.map((category) => ({
        order: category.order,
        id: category.id,
      }))
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AddCategory onAdd={onAdd} />
      <ChangeOrderButtons
        setIsOpened={setIsChangeOrderOpen}
        isOpened={isChangeOrderOpen}
        onSubmit={onSubmitOrder}
        onCancel={onCancelChangeOrder}
      />
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 sm:col-span-2">
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <CardWrapper
                href={`/admin/projects/categories/${category.id}`}
                type="link"
              >
                <CardHeader>
                  <h2 className="font-semibold text-lg">{category.title}</h2>
                  <p className="text-blue-900 font-semibold">
                    {isChangeOrderOpen ? (
                      <OrderInput
                        order={orders}
                        itemID={category.id}
                        onOrderChange={onOrderChange}
                      />
                    ) : (
                      <span>Order: {category.order}</span>
                    )}
                  </p>
                </CardHeader>
                <CardBody>
                  <p className="font-mono bg-slate-100 p-2">
                    {category.description.length > 20
                      ? category.description.slice(0, 20) + "..."
                      : category.description}
                  </p>
                  <p>
                    <span className="font-bold">Sorting Mode:</span>{" "}
                    <span className="italic">{category.sortedBy}</span>
                  </p>
                  <p>
                    <span className="font-bold">Projects:</span>{" "}
                    <span className="italic">{category.numProjects}</span>
                  </p>
                </CardBody>
                <CardFooter>
                  <EditCategory onEdit={onEdit} category={category} />
                  <DeleteCategory onDelete={onDelete} category={category} />
                </CardFooter>
              </CardWrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

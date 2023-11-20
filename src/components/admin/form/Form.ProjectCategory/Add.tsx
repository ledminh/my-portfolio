"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import React, { useState } from "react";
import ToggleButton from "../elements/ToggleButton";
import TextInput from "../elements/TextInput";
import TextArea from "../elements/TextArea";
import Form from "../elements/Form";
import FormGroup from "../elements/FormGroup";
import { NewProjectCategory } from "@/types";
import NumberInput from "../elements/NumberInput";

export default function ProjectCategoryForm(props: {
  onCancel: () => void;
  onSubmit: (newCategory: NewProjectCategory) => void;
}) {
  const [sortedBy, setSortedBy] = useState<"manual" | "auto">("auto");

  const {
    handleSubmit,

    register,
    formState: { errors },
  } = useForm();

  const reset = (e: any) => {
    e?.target.reset();
    setSortedBy("auto");
  };

  const _onSubmit: SubmitHandler<FieldValues> = (data, e) => {
    props.onSubmit({
      order: parseInt(data.order),
      title: data.title,
      description: data.description,
      sortedBy,
    });

    reset(e);
  };

  const _onCancel = (e: any) => {
    props.onCancel();
    reset(e);
  };

  return (
    <Form onSubmit={handleSubmit(_onSubmit)} onReset={_onCancel}>
      <ToggleButton
        enabled={sortedBy === "manual"}
        setEnabled={() =>
          sortedBy === "auto" ? setSortedBy("manual") : setSortedBy("auto")
        }
      >
        <span className="font-medium text-gray-900">
          {sortedBy === "manual" ? "Manual" : "Auto"} Order
        </span>
      </ToggleButton>
      <FormGroup label="Order" htmlFor="order">
        <NumberInput
          register={register}
          errors={errors}
          name="order"
          required="Category's order is required"
        />
      </FormGroup>
      <FormGroup label="Title" htmlFor="title">
        <TextInput
          register={register}
          errors={errors}
          name="title"
          required="Category's title is required"
        />
      </FormGroup>
      <FormGroup label="Description" htmlFor="description">
        <TextArea
          register={register}
          errors={errors}
          name="description"
          required="Category's description is required"
        />
      </FormGroup>
      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <button className="btn btn-secondary" type="reset">
          Cancel
        </button>
      </div>
    </Form>
  );
}

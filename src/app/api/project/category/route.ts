import { NextRequest, NextResponse } from "next/server";
import type {
  ProjectCategoriesResponse,
  ProjectCategoryResponse,
  ProjectCategoryWithProjectsResponse,
} from "@/types";
import getAll from "./getAll";
import getOne from "./getOne";

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<
    | ProjectCategoriesResponse
    | ProjectCategoryResponse
    | ProjectCategoryWithProjectsResponse
  >
> {
  try {
    const action = request.nextUrl.searchParams.get("action");

    if (action === null) {
      throw new Error("action not found");
    }

    switch (action) {
      case "get-all":
        return getAll({
          withProjects:
            request.nextUrl.searchParams.get("with-projects") === "true",
        });
      case "get-one":
        return getOne({
          id: request.nextUrl.searchParams.get("id") as string,
          withProjects:
            request.nextUrl.searchParams.get("with-projects") === "true",
        });
      default:
        throw new Error("action not found");
    }
  } catch (error: any) {
    return NextResponse.json({
      errorMessage: error.message as string,
      payload: null,
    });
  }
}

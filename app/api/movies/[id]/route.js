// Url: http://localhost:3000/api/movies
//HTTP Methods GET, DELETE, PATCH to retrieve, delete and edit a specific movie from the database
import client from "../../../libs/prismadb.js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req, { params }) => {
  try {
    const id = params.id;
    const movie = await client.movie.findUnique({
      where: {
        id: id,
      },
    });
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Error getting movie with ID" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const body = await req.json();
    const { id } = await params;
    const { title, actors, releaseYear } = body;

    const updateMovie = await client.movie.update({
      where: {
        id: id,
      },
      data: {
        title,
        actors,
        releaseYear,
      },
    });
    if (!updateMovie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(updateMovie);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating movie" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    const numericID = id;
    await client.movie.delete({
      where: {
        id: numericID,
      },
    });
    return NextResponse.json({ message: "Movie deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting movie" },
      { status: 500 }
    );
  }
};

import client from "../../libs/prismadb.js";
import { NextResponse } from "next/server";

//URL http://localhost:3000/api/movies

export const POST = async (req) => {
  try {
    const body = await req.json();
    let { title, actors, releaseYear } = body;

    if (typeof actors === "string") {
      actors = actors.split(",").map((actor) => actor.trim());
    } else if (!Array.isArray(actors)) {
      actors = [];
    }

    const newMovie = await client.movie.create({
      data: {
        title,
        actors,
        releaseYear,
      },
    });
    return NextResponse.json(newMovie);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating movie" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const movies = await client.movie.findMany();

    const formattedMovies = movies.map((movie) => ({
      ...movie,
      actors:
        typeof movie.actors === "string"
          ? movie.actors.split(",").map((actor) => actor.trim())
          : movie.actors ?? [],
    }));
    return NextResponse.json(formattedMovies);
  } catch (error) {
    return NextResponse.json(
      { error: "Error getting movies", error },
      { status: 500 }
    );
  }
};

import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
//import AddMovie from "./components/AddMovie";

async function getData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/movies`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const movies = await getData();
  return (
    <div className="flex flex-col p-24">
      <AddMovie />
      <MovieList movies={movies} />
    </div>
  );
}

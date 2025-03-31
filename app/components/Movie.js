"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import React from "react";
import Modal from "./Modal";

const Movie = ({ movie }) => {
  const router = useRouter();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = {
      ...movieToEdit,
      actors: Array.isArray(movieToEdit.actors)
        ? movieToEdit.actors
        : movieToEdit.actors.split(",").map((actor) => actor.trim()),
    };

    axios
      .patch(`api/movies/${movie.id}`, updatedMovie)
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMovieToEdit({});
        setShowModalEdit(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieToEdit((prevState) => ({
      ...prevState,
      [name]:
        name === "releaseYear"
          ? parseInt(value, 10) || ""
          : name === "actors"
          ? value.split(",").map((actor) => actor)
          : value,
    }));
  };

  const handleDeleteMovie = (id) => {
    axios
      .delete(`/api/movies/${id}`, { method: "DELETE" })
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowModalDelete(false);
      });
  };

  return (
    <li
      className="p-4 my-4 bg-slate-200 w-3/4 md:w-1/2 mx-auto rounded-lg shadow-lg"
      key={movie.id}
    >
      <h2 className=" text-xl font-bold text-slate-700 mb-2">
        Title: {movie.title}
      </h2>
      <p className="text-slate-600 font-semibold mb-2"> Actors:</p>
      <ul className="list-disc list-inside text-slate-600 mb-2">
        {Array.isArray(movie.actors) && movie.actors[0] != "" ? (
          movie.actors.map((actor, index) => <li key={index}>{actor}</li>)
        ) : (
          <li>No actors listed</li>
        )}
      </ul>
      <p className="text-slate-600">
        <span className="font-semibold">Release Year:</span> {movie.releaseYear}
      </p>
      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => {
            const editableMovie = {
              ...movie,
              actors: Array.isArray(movie.actors)
                ? movie.actors.join(", ")
                : movie.actors,
            };
            setShowModalEdit(true);
            setMovieToEdit(editableMovie);
          }}
        >
          Edit
        </button>
        <Modal showModal={showModalEdit} setShowModal={setShowModalEdit}>
          <form className="w-full px-5 pb-6" onSubmit={handleEditSubmit}>
            <h1 className=" text-xl font-bold text-slate-700 pb-4">
              Update a Movie
            </h1>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 mb-3 bg-amber-50"
              value={movieToEdit.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="actors"
              placeholder="Actors"
              className="w-full p-2 mb-3 bg-amber-50"
              value={movieToEdit.actors}
              onChange={handleChange}
            />
            <input
              type="number"
              name="releaseYear"
              placeholder="Release Year"
              className="w-full p-2 mb-3 bg-amber-50"
              value={movieToEdit.releaseYear}
              onChange={handleChange}
            />
            <button type="submit" className="bg-blue-500 text-white px-5 p-2">
              Update
            </button>
          </form>
        </Modal>
        <button
          className="text-red-700"
          onClick={() => setShowModalDelete(true)}
        >
          Delete
        </button>
        <Modal showModal={showModalDelete} setShowModal={setShowModalDelete}>
          <div className="flex flex-col">
            <h1 className="text-2xl pb-3 text-center">
              Are you sure you want to delete this movie?
            </h1>
            <div className="flex justify-end">
              <button
                className="text-blue-700 font-bold mr-5 text-left"
                onClick={() => {
                  handleDeleteMovie(movie.id);
                }}
              >
                Yes
              </button>
              <button
                className="text-red-700 font-bold text-left"
                onClick={() => {
                  setShowModalDelete(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </li>
  );
};

export default Movie;

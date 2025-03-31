"use client";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddMovie = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]:
        name === "releaseYear"
          ? parseInt(value, 10) || ""
          : name === "actors"
          ? value.split(",").map((actor) => actor)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/movies", input)
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInput({ title: "", actors: "", releaseYear: "" });
        setShowModal(false);
      });
  };
  return (
    <div>
      <button
        className="bg-blue-700 text-white p-3 cursor-pointer ml-69"
        onClick={() => setShowModal(true)}
      >
        Add Movie
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form className="w-full px-5 pb-6" onSubmit={handleSubmit}>
          <h1 className=" text-xl font-bold text-slate-700 pb-4">
            Add or Update a Post
          </h1>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 mb-3 bg-amber-50"
            value={input.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="actors"
            placeholder="Actors"
            className="w-full p-2 mb-3 bg-amber-50"
            value={input.actors}
            onChange={handleChange}
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            className="w-full p-2 mb-3 bg-amber-50"
            value={input.releaseYear}
            onChange={handleChange}
          />
          <button type="submit" className="bg-blue-700 text-white px-5 py-2">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default AddMovie;

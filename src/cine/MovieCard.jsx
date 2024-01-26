/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Tag from "../assets/tag.svg";
import { MovieContext } from "../context";
import { getImgUrl } from "../utils/cine-utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { state, dispatch } = useContext(MovieContext);

  function handleCloseModal() {
    setSelectedMovie(null);
    setShowModal(false);
  }

  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  function handleAddToCart(event, movie) {
    event.stopPropagation();

    const found = state.cartData.find((item) => item.id === movie.id);
    if (found) {
      toast.error(`${movie.title} is already added to the cart`, {
        position: "bottom-right",
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });

      toast.success(`${movie.title} added to cart successfully`, {
        position: "bottom-right",
      });
    }
  }

  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure
        className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl cursor-pointer"
        onClick={() => handleMovieSelection(movie)}
      >
        <img
          className="w-full object-cover"
          src={getImgUrl(movie.cover)}
          alt="movie cover"
        />
        <figcaption className="pt-4">
          <h3 className="text-xl mb-1">{movie.title}</h3>
          <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
          <div className="flex items-center space-x-1 mb-5">
            <Rating value={movie.rating} />
          </div>
          <button
            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
            onClick={(e) => handleAddToCart(e, movie)}
          >
            <img src={Tag} alt="tag" />
            <span>${movie.price} | Add to Cart</span>
          </button>
        </figcaption>
      </figure>
    </>
  );
}

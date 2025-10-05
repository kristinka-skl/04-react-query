import { useEffect, useState } from "react";
import css from "./App.module.css";
import "modern-normalize";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

export default function App() {
  const [topic, setTopic] = useState<string>("");
  const [currentPage, setPage] = useState<number>(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["topic", topic, currentPage],
    queryFn: () => fetchMovies(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.total_pages ?? 0;
  const [modalData, setModalData] = useState<Movie | null>(null);
  const handleSearch = async (topic: string) => {
    setTopic(topic);
    setPage(1);
  };
  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast("No movies found for your request");
    }
  }, [isSuccess, data]);
  const handleSelect = (data: Movie) => {
    setModalData(data);
  };

  const handleModalClose = () => {
    setModalData(null);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data?.results && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={data.results} />
      )}
      {modalData && <MovieModal onClose={handleModalClose} movie={modalData} />}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

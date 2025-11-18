import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../api/movies";
import css from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {isFetching && <p>Loading...</p>}

      {data?.results?.map((movie) => (
        <div key={movie.id} className={css.movie}>
          {movie.title}
        </div>
      ))}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
};

export default App;

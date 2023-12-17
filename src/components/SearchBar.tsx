import React, { useEffect, useState, ChangeEvent } from "react";
import QuoteCard from "./QuoteCard";
import { DotLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

export interface Iquote {
  quote: string;
  author: string;
}

const SearchBar = () => {
  const [quotesData, setQuotesData] = useState<Iquote[]>([]);
  const [filterByAuthorInput, setfilteredByAuthorInput] = useState<
    string | undefined
  >();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  //pagination variables
  const [currentPage, setCurrentPage] = useState<number>(0);
  const quotesPerPages = 10;
  const pageCount = Math.ceil(quotesData.length / quotesPerPages);
  const pagesVisited = quotesPerPages * currentPage;

  useEffect(() => {
    fetch("https://api.breakingbadquotes.xyz/v1/quotes/40")
      .then((res) => res.json())
      .then((data) => {
        setQuotesData(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleFilterAuthors = (e: ChangeEvent<HTMLInputElement>) => {
    setfilteredByAuthorInput(e.target.value);
  };
  const displayQuote = quotesData
    .slice(pagesVisited, pagesVisited + quotesPerPages)
    .filter(
      (quoteDetails) =>
        quoteDetails.author
          ?.toLowerCase()
          .includes(filterByAuthorInput || "") ||
        quoteDetails.author?.toUpperCase().includes(filterByAuthorInput || "")
    )
    .map((quoteDetails, index) => (
      <div key={index}>
        <QuoteCard quoteDetails={quoteDetails} />
      </div>
    ));
  const changePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="SearchBarandQuoteComp">
      <input
        className="searchBar"
        type="text"
        value={filterByAuthorInput}
        onChange={handleFilterAuthors}
        placeholder="Search by author"
      />
      <div>
        {isLoading ? (
          <div>
            <DotLoader color="#36d7b7" />
            <b>L O A D I N G</b>
          </div>
        ) : (
          <div className="renderedQuoteCard">
            {displayQuote.length > 0 ? (
              displayQuote
            ) : (
              <div>
                <b>This author doesn't exist.</b>
              </div>
            )}

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="paginationButtons"
              previousLinkClassName="previousButton"
              nextLinkClassName="nextButton"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

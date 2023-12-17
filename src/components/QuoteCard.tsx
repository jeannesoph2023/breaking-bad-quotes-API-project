import React from "react";
import { Iquote } from "./SearchBar";

interface IquoteProps {
  quoteDetails: Iquote;
}
const QuoteCard: React.FC<IquoteProps> = ({ quoteDetails }) => {
  return (
    <div className="quoteauthor">
      <div>
        <i>{quoteDetails.quote}</i>
      </div>
      <div className="author">
        <div>
          <b>{quoteDetails.author}</b>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;

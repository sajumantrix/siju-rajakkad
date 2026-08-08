import { IconQuote } from "./Icons";

export default function AuthorQuote({ author }) {
  return (
    <section className="pro-quote-section">
      <div className="container">
        <div className="pro-quote-inner">
          <IconQuote size={32} className="pro-quote-icon" />
          <p className="pro-quote-en">{author.quoteEN || "{quote}"}</p>
          <p className="pro-quote-ml">{author.quote || "{quote_ml}"}</p>
          <div className="pro-quote-rule" />
          <p className="pro-quote-attribution">{author.name}</p>
        </div>
      </div>
    </section>
  );
}

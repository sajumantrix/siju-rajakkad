"use client";
import { IconNewspaper } from "./Icons";

export default function MediaCoverage({ media }) {
  if (!media || media.length === 0) return null;
  return (
    <section className="section section-alt" id="media">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Press</div>
          <h2 className="section-title">In the Media</h2>
          <p className="section-sub">Press coverage and features</p>
        </div>
        <div className="media-list">
          {media.map((item, i) => (
            <div key={i} className={`media-row animate-on-scroll stagger-${(i % 4) + 1}`}>
              <div className="media-pub-col">
                <div className="media-pub-name">{item.publication}</div>
                <div className="media-pub-date">{item.date}</div>
              </div>
              <div className="media-content-col">
                <div className="media-article-title">{item.title}</div>
                <p className="media-excerpt">{item.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

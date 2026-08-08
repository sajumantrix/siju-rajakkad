"use client";

export default function About({ bio, author }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap animate-on-scroll">
            <img src={author.portrait} alt={author.name} className="about-img" />
            <p className="about-img-caption">{author.name} - {author.tagline}</p>
          </div>
          <div className="about-content">
            <div className="section-label">About the Author</div>
            <h2 className="section-title section-title-nowrap">The Story Behind the Storyteller</h2>
            <p className="bio-intro animate-on-scroll font-ml text-lg leading-relaxed">{bio.intro}</p>
            {bio?.sections?.map((section, i) => (
              <div key={i} className={`bio-section animate-on-scroll stagger-${(i % 4) + 1}`}>
                <div className="bio-section-title">{section.title}</div>
                <p className="bio-section-text">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

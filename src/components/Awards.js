import { IconAward } from "./Icons";

export default function Awards({ awards = [] }) {
  return (
    <section className="pro-awards-section" id="awards">
      <div className="container">
        <div className="section-header" style={{ marginBottom: "48px", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Recognition</div>
          <h2 className="section-title">Awards</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>Milestones in a literary journey</p>
        </div>

        <div className="pro-awards-grid">
          {awards.map((award, i) => (
            <div key={i} className={`pro-award-item animate-on-scroll stagger-${(i % 4) + 1}`}>
              <div className="pro-award-icon">
                <IconAward size={20} />
              </div>
              <div className="pro-award-body">
                <div className="pro-award-year">{award.year}</div>
                <h3 className="pro-award-title">{award.title}</h3>
                <p className="pro-award-desc">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

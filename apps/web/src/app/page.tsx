import Link from "next/link";

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="PREform NCLEX home">
          <span className="wordmark-icon" aria-hidden="true">P</span>
          <span>PREform</span>
          <span className="wordmark-suffix">NCLEX</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#approach">Our approach</a>
          <a href="#pathways">RN &amp; PN pathways</a>
          <a className="header-cta" href="#build-status">
            Platform status <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="main-content">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            A more considered way to prepare
          </p>
          <h1>
            Prepare with clarity.
            <br />
            <span>Progress with purpose.</span>
          </h1>
          <p className="hero-description">
            A focused learning platform for future nurses—being built around
            sound clinical reasoning, original study content and honest
            measures of progress.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#pathways">
              Explore the pathways <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#approach">
              What guides us <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-note">
            For NCLEX-RN and NCLEX-PN candidates. Not affiliated with or
            endorsed by NCSBN.
          </p>
        </div>

        <div className="hero-visual" aria-label="PREform learning principles">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-center">
            <span className="visual-cross" aria-hidden="true">+</span>
            <span className="visual-caption">LEARN WITH INTENTION</span>
          </div>
          <div className="visual-tag tag-top">
            <span className="tag-index">01</span>
            <span>Understand</span>
          </div>
          <div className="visual-tag tag-right">
            <span className="tag-index">02</span>
            <span>Practise</span>
          </div>
          <div className="visual-tag tag-bottom">
            <span className="tag-index">03</span>
            <span>Reflect</span>
          </div>
          <span className="visual-spark spark-one" aria-hidden="true">✳</span>
          <span className="visual-spark spark-two" aria-hidden="true">·</span>
        </div>
      </section>

      <section className="principles-section" id="approach">
        <div className="section-heading">
          <p className="eyebrow">Our approach</p>
          <h2>Better preparation starts with better principles.</h2>
        </div>
        <div className="principle-grid">
          <article className="principle-card">
            <span className="principle-number">01 / LEARN</span>
            <h3>Make the reasoning make sense.</h3>
            <p>
              Build understanding around the clinical thinking behind an
              answer—not just whether it was right.
            </p>
          </article>
          <article className="principle-card">
            <span className="principle-number">02 / PRACTISE</span>
            <h3>Practise with purpose.</h3>
            <p>
              Connect practice to the concepts and question formats candidates
              need to work through.
            </p>
          </article>
          <article className="principle-card">
            <span className="principle-number">03 / PROGRESS</span>
            <h3>Keep the signals honest.</h3>
            <p>
              Make room for meaningful progress without overstating what a
              practice result can tell you.
            </p>
          </article>
        </div>
      </section>

      <section className="pathways-section" id="pathways">
        <div className="pathways-heading">
          <div>
            <p className="eyebrow">One platform. Two pathways.</p>
            <h2>Your programme, your preparation.</h2>
          </div>
          <p>
            RN and PN learning belong in one thoughtful experience, with space
            for the differences that matter.
          </p>
        </div>
        <div className="pathway-grid">
          <Link className="pathway-card pathway-rn" href="/programmes/rn">
            <span className="pathway-code">RN PATHWAY</span>
            <span className="pathway-title">NCLEX-RN</span>
            <span className="pathway-detail">Registered Nurse preparation</span>
            <span className="pathway-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="pathway-card pathway-pn" href="/programmes/pn">
            <span className="pathway-code">PN PATHWAY</span>
            <span className="pathway-title">NCLEX-PN</span>
            <span className="pathway-detail">
              Practical / Vocational Nurse preparation
            </span>
            <span className="pathway-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="status-section" id="build-status">
        <div className="status-mark" aria-hidden="true">P.</div>
        <div>
          <p className="eyebrow">Building in the open</p>
          <h2>A strong foundation comes first.</h2>
          <p>
            PREform is in early development. Accounts, question banks,
            assessments, subscriptions and AI study tools are not available yet.
            We will introduce each capability only when it is ready to support
            learners responsibly.
          </p>
        </div>
        <span className="status-label">
          <span className="status-dot" aria-hidden="true" />
          Foundation phase
        </span>
      </section>

      <footer className="site-footer">
        <Link className="wordmark footer-wordmark" href="/">
          <span className="wordmark-icon" aria-hidden="true">P</span>
          <span>PREform</span>
          <span className="wordmark-suffix">NCLEX</span>
        </Link>
        <p>Thoughtful preparation for the next step in nursing.</p>
        <a href="#main-content">Back to top ↑</a>
        <span className="footer-legal">
          NCLEX is a registered trademark of the National Council of State
          Boards of Nursing, Inc. PREform is independent and not affiliated
          with, endorsed by, or sponsored by NCSBN.
        </span>
      </footer>
    </main>
  );
}

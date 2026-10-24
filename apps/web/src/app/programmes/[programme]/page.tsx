import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const programmes = {
  rn: {
    code: "RN",
    title: "NCLEX-RN",
    audience: "Registered Nurse candidates",
    description:
      "A dedicated pathway for candidates preparing for the National Council Licensure Examination for Registered Nurses.",
  },
  pn: {
    code: "PN",
    title: "NCLEX-PN",
    audience: "Practical / Vocational Nurse candidates",
    description:
      "A dedicated pathway for candidates preparing for the National Council Licensure Examination for Practical Nurses.",
  },
} as const;

type ProgrammeCode = keyof typeof programmes;

function isProgrammeCode(value: string): value is ProgrammeCode {
  return Object.hasOwn(programmes, value);
}

export function generateStaticParams() {
  return Object.keys(programmes).map((programme) => ({ programme }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ programme: string }>;
}): Promise<Metadata> {
  const { programme } = await params;

  if (!isProgrammeCode(programme)) {
    return { title: "Programme not found" };
  }

  return { title: `${programmes[programme].title} pathway` };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ programme: string }>;
}) {
  const { programme } = await params;

  if (!isProgrammeCode(programme)) {
    notFound();
  }

  const pathway = programmes[programme];

  return (
    <main className="programme-page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="PREform NCLEX home">
          <span className="wordmark-icon" aria-hidden="true">P</span>
          <span>PREform</span>
          <span className="wordmark-suffix">NCLEX</span>
        </Link>
        <Link className="header-cta" href="/#pathways">
          All pathways <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <section className="programme-main" id="main-content">
        <div className="programme-content">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {pathway.code} pathway · {pathway.audience}
          </p>
          <h1>{pathway.title}</h1>
          <p>{pathway.description}</p>
          <div className="programme-notice">
            This pathway is part of the PREform product plan and is not open for
            enrollment. No question bank, assessment or study service is
            available yet.
          </div>
          <Link className="button button-primary" href="/#build-status">
            See platform status <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <footer className="site-footer">
        <Link className="wordmark footer-wordmark" href="/">
          <span className="wordmark-icon" aria-hidden="true">P</span>
          <span>PREform</span>
          <span className="wordmark-suffix">NCLEX</span>
        </Link>
        <p>Thoughtful preparation for the next step in nursing.</p>
        <Link href="/#pathways">All pathways ↑</Link>
        <span className="footer-legal">
          NCLEX is a registered trademark of the National Council of State
          Boards of Nursing, Inc. PREform is independent and not affiliated
          with, endorsed by, or sponsored by NCSBN.
        </span>
      </footer>
    </main>
  );
}

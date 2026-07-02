import React from 'react';
import Container from '../layout/Container';
import { TRUSTED_COMPANIES } from '../../data/marketing';

export function TrustedCompanies() {
  return (
    <section className="border-y border-slate-800 bg-slate-950/50 py-10" aria-labelledby="trusted-heading">
      <Container>
        <h2 id="trusted-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Designed for ambitious creative teams
        </h2>
        <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 text-center sm:grid-cols-3 lg:grid-cols-6">
          {TRUSTED_COMPANIES.map((company) => (
            <li key={company} className="text-sm font-semibold tracking-wide text-slate-400">
              {company}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default TrustedCompanies;

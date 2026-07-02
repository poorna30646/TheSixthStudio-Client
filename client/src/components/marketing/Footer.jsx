import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import { FOOTER_GROUPS } from '../../config/navigation';
import Brand from './Brand';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-6 text-slate-400">
              One production workspace for AI-assisted video, voice, assets, and repeatable creative systems.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link className="text-sm text-slate-400 transition hover:text-white" to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
          <p>© {currentYear} TheSixthStudio. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { FaEnvelope, FaLifeRing, FaRegBuilding } from 'react-icons/fa';
import PageContainer from '../../components/layout/PageContainer';

const contactOptions = [
  {
    icon: FaEnvelope,
    title: 'General questions',
    detail: 'Product, partnerships, and everything in between.',
    action: 'hello@thesixthstudio.com',
    href: 'mailto:hello@thesixthstudio.com',
  },
  {
    icon: FaLifeRing,
    title: 'Customer support',
    detail: 'Account, workspace, or production assistance.',
    action: 'support@thesixthstudio.com',
    href: 'mailto:support@thesixthstudio.com',
  },
  {
    icon: FaRegBuilding,
    title: 'Studio and enterprise',
    detail: 'Team workflows, volume, and commercial plans.',
    action: 'studio@thesixthstudio.com',
    href: 'mailto:studio@thesixthstudio.com',
  },
];

export function ContactPage() {
  return (
    <PageContainer
      eyebrow="Contact"
      title="Let’s talk about what you’re creating"
      description="Choose the path that fits your question. A focused inbox gets you to the right conversation faster."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {contactOptions.map(({ icon: Icon, title, detail, action, href }) => (
          <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
              <Icon aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{detail}</p>
            <a className="mt-6 inline-block text-sm font-semibold text-amber-400 hover:text-amber-300" href={href}>
              {action}
            </a>
          </article>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">What helps us respond quickly</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Include the outcome you are aiming for, your publishing cadence, team size, and any production constraints. Do not include passwords, access tokens, or private customer media.
        </p>
      </div>
    </PageContainer>
  );
}

export default ContactPage;

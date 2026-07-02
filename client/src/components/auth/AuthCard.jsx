import React from 'react';
import PropTypes from 'prop-types';

export function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-xl font-semibold text-amber-400">
          TS
        </div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {children}
      {footer ? <div className="mt-6 text-center text-sm text-slate-400">{footer}</div> : null}
    </div>
  );
}

AuthCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

export default AuthCard;

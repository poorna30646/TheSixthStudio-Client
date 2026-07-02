import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';
import Section from '../layout/Section';
import { FAQ_ITEMS } from '../../data/marketing';
import { cn } from '../../utils/cn';

export function FAQ({ limit }) {
  const [openIndex, setOpenIndex] = useState(0);
  const items = Number.isInteger(limit) ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Questions, answered"
      description="A practical overview of the platform foundation and intended workflow."
    >
      <div className="mx-auto max-w-3xl divide-y divide-slate-800 border-y border-slate-800">
        {items.map((item, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;

          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className="font-medium text-white">{item.question}</span>
                <FaChevronDown className={cn('shrink-0 text-xs text-slate-500 transition', open && 'rotate-180')} aria-hidden="true" />
              </button>
              {open ? (
                <div id={panelId} className="pb-5 pr-10 text-sm leading-6 text-slate-400">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

FAQ.propTypes = {
  limit: PropTypes.number,
};

export default FAQ;

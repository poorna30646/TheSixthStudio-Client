import React from 'react';
import { FaPlay } from 'react-icons/fa';
import Section from '../layout/Section';
import { VOICES } from '../../data/marketing';

export function VoiceShowcase() {
  return (
    <Section
      id="voices"
      eyebrow="Voice"
      title="Find the voice that fits the story"
      description="Preview tone, language, and delivery before narration becomes part of the timeline."
      className="bg-slate-950/50"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {VOICES.map((voice) => (
          <article key={voice.name} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-800 text-sm font-semibold text-amber-300">
              {voice.initials}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white">{voice.name}</h3>
              <p className="truncate text-sm text-slate-400">{voice.style}</p>
              <p className="mt-1 text-xs text-slate-500">{voice.language}</p>
            </div>
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-700 text-xs text-slate-300"
              aria-label={`Preview ${voice.name} voice`}
            >
              <FaPlay aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default VoiceShowcase;

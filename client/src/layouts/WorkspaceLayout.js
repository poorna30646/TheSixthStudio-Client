import React from 'react';
import { FaArrowLeft, FaCloud, FaPlay } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import Button from '../components/common/Button';
import Brand from '../components/marketing/Brand';

/**
 * Focused creator shell. Product navigation is intentionally replaced by
 * project controls so future editor modules can use the full viewport.
 */
export function WorkspaceLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-800 px-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to="/projects"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white"
            aria-label="Back to projects"
          >
            <FaArrowLeft aria-hidden="true" />
          </Link>
          <Brand compact className="hidden sm:inline-flex" />
          <div className="min-w-0 border-l border-slate-800 pl-4">
            <p className="truncate text-sm font-medium">Untitled video</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <FaCloud aria-hidden="true" /> Draft saved
            </p>
          </div>
        </div>
        <Button size="sm">
          <FaPlay className="text-xs" aria-hidden="true" /> Render
        </Button>
      </header>
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default WorkspaceLayout;

import React from 'react';
import ProductAreaPage from '../../components/product/ProductAreaPage';

export function ProjectsPage() {
  return (
    <ProductAreaPage
      eyebrow="Production"
      title="Projects"
      description="Organize scripts, scenes, source media, collaborators, and output around each production."
      actionLabel="New project"
      emptyTitle="Create your first project"
      emptyDescription="Projects will become the source of truth for every video workflow in Module 4."
    />
  );
}

export default ProjectsPage;

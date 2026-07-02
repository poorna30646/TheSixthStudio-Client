import React from 'react';
import ProductAreaPage from '../../components/product/ProductAreaPage';

export function VideosPage() {
  return (
    <ProductAreaPage
      eyebrow="Output"
      title="Videos"
      description="Track drafts, render jobs, completed videos, and production history."
      actionLabel="Create video"
      emptyTitle="No videos yet"
      emptyDescription="Video drafts and rendered output will remain connected to their source projects."
    />
  );
}

export default VideosPage;

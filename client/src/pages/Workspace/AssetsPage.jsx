import React from 'react';
import ProductAreaPage from '../../components/product/ProductAreaPage';

export function AssetsPage() {
  return (
    <ProductAreaPage
      eyebrow="Library"
      title="Assets"
      description="A shared home for uploaded footage, images, audio, and generated media."
      actionLabel="Upload assets"
      emptyTitle="Build your media library"
      emptyDescription="Uploaded files will appear here with searchable metadata and project associations."
    />
  );
}

export default AssetsPage;

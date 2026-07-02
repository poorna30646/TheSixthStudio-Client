import React from 'react';
import ProductAreaPage from '../../components/product/ProductAreaPage';

export function VoicesPage() {
  return (
    <ProductAreaPage
      eyebrow="Narration"
      title="Voices"
      description="Search, preview, and save voices that match your projects and brand."
      emptyTitle="Choose a voice for your story"
      emptyDescription="Saved voices and recent narration choices will be available here."
    />
  );
}

export default VoicesPage;

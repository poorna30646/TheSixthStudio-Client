import React from 'react';
import AssetCard from './AssetCard';

export function AssetGrid({ assets, onView, onDelete, onReplace, onDownload, onCopy }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Assets grid">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onView={onView}
          onDelete={onDelete}
          onReplace={onReplace}
          onDownload={onDownload}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}

export default AssetGrid;

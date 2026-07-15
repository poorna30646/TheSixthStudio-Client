import React from 'react';
import {
  AssetGrid,
  AssetList,
  AssetStats,
  AssetsHeader,
  AssetsToolbar,
  EmptyAssets,
} from '../../components/assets';
import {
  ASSET_CATEGORIES,
  ASSET_SORT_OPTIONS,
  ASSETS,
  STORAGE_SUMMARY,
} from '../../data/assets';

export function AssetsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <AssetsHeader
        eyebrow="Library"
        title="Assets"
        description="Manage images, videos, audio, and documents used across production workflows."
      />

      <AssetStats assets={ASSETS} storage={STORAGE_SUMMARY} />

      <AssetsToolbar
        searchValue=""
        filterValue="all"
        filterOptions={ASSET_CATEGORIES}
        sortValue="uploaded_desc"
        sortOptions={ASSET_SORT_OPTIONS}
        viewMode="grid"
      />

      <section className="mt-7">
        {ASSETS.length === 0 ? (
          <EmptyAssets />
        ) : (
          <AssetGrid assets={ASSETS} />
        )}
      </section>

      <section className="mt-7">
        <AssetList assets={ASSETS} />
      </section>
    </div>
  );
}

export default AssetsPage;

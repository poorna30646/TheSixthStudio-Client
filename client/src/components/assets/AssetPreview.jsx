import React from 'react';
import { FaFileAlt, FaFileArchive, FaFileAudio, FaFileImage, FaFileVideo } from 'react-icons/fa';

const TYPE_LABELS = {
  image: 'IMG',
  video: 'VID',
  audio: 'AUD',
  document: 'DOC',
  archive: 'ZIP',
};

const TYPE_ICONS = {
  image: FaFileImage,
  video: FaFileVideo,
  audio: FaFileAudio,
  document: FaFileAlt,
  archive: FaFileArchive,
};

export function AssetPreview({ asset, type, color, size = 'md' }) {
  const assetType = asset?.type || type;
  const previewUrl = asset?.previewUrl || asset?.downloadUrl;
  const Icon = TYPE_ICONS[assetType] || FaFileAlt;
  const roundedClass = size === 'lg' ? 'rounded-2xl' : 'rounded-xl';

  if (assetType === 'image' && previewUrl) {
    return (
      <div className={`aspect-video overflow-hidden ${roundedClass} bg-slate-800`}>
        <img src={previewUrl} alt={asset?.filename || 'Asset preview'} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  if (assetType === 'video' && previewUrl) {
    return (
      <div className={`aspect-video overflow-hidden ${roundedClass} bg-slate-950`}>
        <video
          src={previewUrl}
          className="h-full w-full object-cover"
          preload="metadata"
          muted={size !== 'lg'}
          controls={size === 'lg'}
          playsInline
        />
      </div>
    );
  }

  return (
    <div className={`flex aspect-video items-center justify-center ${roundedClass} ${color || 'bg-slate-800'}`}>
      <div className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
        <span className="flex items-center gap-2">
          <Icon />
          {TYPE_LABELS[assetType] || 'FILE'}
        </span>
      </div>
    </div>
  );
}

export default AssetPreview;

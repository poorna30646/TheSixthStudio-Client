import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import AssetPreview from './AssetPreview';

function formatDate(value) {
  if (!value) return 'Not available';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';
  return date.toLocaleString();
}

function stringifyReference(value) {
  if (!value) return 'None';
  if (typeof value === 'string') return value;
  return value.title || value.name || value.fullName || value.username || value._id || value.id || 'Available';
}

function getDimensions(asset) {
  const width = asset?.metadata?.width ?? asset?.metadata?.dimensions?.width ?? asset?.width;
  const height = asset?.metadata?.height ?? asset?.metadata?.dimensions?.height ?? asset?.height;

  if (!width || !height) return 'Not available';
  return `${width} x ${height}`;
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm text-slate-200">{value || 'Not available'}</p>
    </div>
  );
}

export function AssetDetailsModal({
  open,
  asset,
  onClose,
  onCopy,
  onDownload,
}) {
  if (!asset) return null;

  return (
    <Modal open={open} onClose={onClose} title="Asset details" size="lg">
      <div className="space-y-5">
        <AssetPreview asset={asset} type={asset.type} color={asset.thumbnailColor} size="lg" />

        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 md:grid-cols-2">
          <DetailRow label="Filename" value={asset.filename} />
          <DetailRow label="Original filename" value={asset.metadata?.originalName || asset.originalName || asset.filename} />
          <DetailRow label="Size" value={asset.size} />
          <DetailRow label="MIME type" value={asset.mimeType} />
          <DetailRow label="Dimensions" value={getDimensions(asset)} />
          <DetailRow label="Created" value={formatDate(asset.createdAt || asset.uploadedAt)} />
          <DetailRow label="Updated" value={formatDate(asset.updatedAt)} />
          <DetailRow label="Project" value={stringifyReference(asset.project)} />
          <DetailRow label="Owner" value={stringifyReference(asset.owner || asset.user)} />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={() => onCopy?.(asset)}>
            Copy URL
          </Button>
          <Button variant="secondary" type="button" onClick={() => onDownload?.(asset)}>
            Download
          </Button>
          <Button variant="primary" type="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
};

AssetDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  asset: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
  onDownload: PropTypes.func,
};

export default AssetDetailsModal;

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';
import Modal from '../common/Modal';
import Button from '../common/Button';

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-matroska',
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'audio/mp4',
  'audio/aac',
  'audio/flac',
  'audio/webm',
  'application/json',
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
];

const ACCEPT = ACCEPTED_TYPES.join(',');

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}

export function UploadAssetModal({
  open,
  onClose,
  onUpload,
  submitting,
  progress,
  multiple,
  title,
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [lastFiles, setLastFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState(null);

  const reset = () => {
    setFiles([]);
    setLastFiles([]);
    setDragActive(false);
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleFiles = (selectedFiles) => {
    const nextFiles = Array.from(selectedFiles || []).filter(Boolean);
    if (!nextFiles.length) return;

    const unsupported = nextFiles.find((selectedFile) => !ACCEPTED_TYPES.includes(selectedFile.type));
    if (unsupported) {
      setLocalError('This file type is not supported.');
      setFiles([]);
      return;
    }

    setLocalError(null);
    setFiles(multiple ? nextFiles : nextFiles.slice(0, 1));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const runUpload = async (filesToUpload) => {
    const selectedFiles = Array.from(filesToUpload || []).filter(Boolean);

    if (!selectedFiles.length) {
      setLocalError('Choose a file before uploading.');
      return;
    }

    setLocalError(null);
    setLastFiles(selectedFiles);

    try {
      await onUpload(multiple ? selectedFiles : selectedFiles[0]);
      reset();
      onClose();
    } catch (err) {
      setLocalError(err?.message || 'Failed to upload asset.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await runUpload(files);
  };

  return (
    <Modal open={open} onClose={handleClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex w-full flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition ${
            dragActive
              ? 'border-yellow-400 bg-yellow-400/10'
              : 'border-slate-700 bg-slate-950/50 hover:border-yellow-500/80'
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-slate-950">
            <FaCloudUploadAlt />
          </span>
          <span className="mt-4 text-sm font-semibold text-white">
            {files.length
              ? multiple
                ? 'Replace selected files'
                : 'Replace selected file'
              : multiple
                ? 'Choose or drop files'
                : 'Choose or drop a file'}
          </span>
          <span className="mt-1 text-xs text-slate-400">Images, videos, audio, PDF, JSON, or ZIP</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple={multiple}
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />

        {files.length ? (
          <div className="max-h-56 space-y-2 overflow-y-auto">
            {files.map((file) => (
              <div key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-yellow-400">
                  <FaFileAlt />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{file.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {files.length > 1 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
            {files.length} files selected
          </div>
        ) : null}

        {localError ? (
          <div className="space-y-3 rounded-xl border border-rose-800 bg-rose-900/10 p-3 text-xs text-rose-200">
            <div>{localError}</div>
            {lastFiles.length ? (
              <button
                type="button"
                className="h-8 rounded-lg border border-rose-800 px-3 text-xs font-semibold text-rose-100 hover:bg-rose-900/30"
                onClick={() => runUpload(lastFiles)}
                disabled={submitting}
              >
                Retry upload
              </button>
            ) : null}
          </div>
        ) : null}

        {submitting ? (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-yellow-500 transition-all"
                style={{ width: `${Math.max(8, progress || 0)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">Uploading {progress || 0}%</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={submitting} disabled={!files.length || submitting}>
            {submitting ? 'Uploading' : 'Upload'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

UploadAssetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  progress: PropTypes.number,
  multiple: PropTypes.bool,
  title: PropTypes.string,
};

UploadAssetModal.defaultProps = {
  submitting: false,
  progress: 0,
  multiple: true,
  title: 'Upload asset',
};

export default UploadAssetModal;

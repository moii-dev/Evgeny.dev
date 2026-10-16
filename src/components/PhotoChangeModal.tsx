import React, { useState } from 'react';
import { X, Upload, RotateCcw, Link as LinkIcon, Check } from 'lucide-react';
import { Modal } from './Modal';
import { useImageUpload } from '../hooks/useImageUpload';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string;
  isMonochrome: boolean;
  onSavePhoto: (newUrl: string, monochrome: boolean) => void;
  onReset: () => void;
  defaultPhoto: string;
  githubAvatar: string;
}

export const PhotoChangeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentPhoto,
  isMonochrome,
  onSavePhoto,
  onReset,
  defaultPhoto,
  githubAvatar,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(currentPhoto);
  const [mono, setMono] = useState(isMonochrome);
  const upload = useImageUpload(setPreviewPhoto);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) void upload.file(file);
  };

  const handleApplyUrl = () => {
    if (inputUrl.trim()) {
      void upload.url(inputUrl);
      setInputUrl('');
    }
  };

  const handleSave = () => {
    if (upload.busy) return;
    onSavePhoto(previewPhoto, mono);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Custom Portrait">
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md max-h-[calc(100dvh-2rem)] bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-y-auto overscroll-contain p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Custom Portrait</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Personalize your developer photo on the hero section
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close portrait editor"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Live Preview */}
        <div className="my-5 flex flex-col items-center">
          <div className="relative w-36 h-44 rounded-2xl overflow-hidden border-2 border-neutral-900 shadow-md bg-neutral-100">
            <img
              src={previewPhoto}
              alt="Developer Portrait Preview"
              className={`w-full h-full object-cover transition-all ${
                mono ? 'grayscale contrast-110 brightness-95' : ''
              }`}
            />
            {mono && (
              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/70 text-[9px] text-white rounded font-mono">
                B&W
              </span>
            )}
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs font-medium text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={mono}
              onChange={(e) => setMono(e.target.checked)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            Apply editorial monochrome filter (B&W)
          </label>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { upload.cancel(); setPreviewPhoto(defaultPhoto); }}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-xl border transition-colors ${
                previewPhoto === defaultPhoto
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              Default Editorial
            </button>
            <button
              onClick={() => { void upload.url(githubAvatar); }}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-xl border transition-colors ${
                previewPhoto === githubAvatar
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              GitHub Avatar
            </button>
          </div>

          {/* File Upload Button */}
          <div>
            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 cursor-pointer text-xs font-medium text-neutral-700 transition-colors">
              <Upload size={14} />
              <span>Upload photo from your device</span>
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={handleFileUpload} className="sr-only" />
            </label>
          </div>

          {/* URL Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                aria-label="Image URL"
                placeholder="Or paste image URL..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyUrl()}
                className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900"
              />
              <LinkIcon size={13} className="absolute left-2.5 top-2.5 text-neutral-400" />
            </div>
            <button
              onClick={handleApplyUrl}
              disabled={!inputUrl.trim()}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 text-xs font-medium rounded-xl text-neutral-800 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>

        <p role="status" className="mt-3 text-xs text-neutral-600">{upload.busy ? 'Processing image…' : upload.error}</p>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => {
              upload.cancel();
              onReset();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={upload.busy}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-medium bg-neutral-900 hover:bg-black text-white rounded-xl shadow transition-colors"
            >
              <Check size={14} />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </Modal>
  );
};

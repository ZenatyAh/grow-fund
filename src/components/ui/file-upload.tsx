import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  children,
  uploadClassName,
  emptyStateClassName,
  accept,
  maxSize,
  disabled,
}: {
  onChange?: (files: File[]) => void;
  children: React.ReactNode;
  uploadClassName: string;
  emptyStateClassName: string;
  accept?: string | any;
  maxSize?: number;
  disabled?: boolean;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const selectedFile = newFiles[0];
    if (!selectedFile) return;

    if (maxSize && selectedFile.size > maxSize) return;
    setFile(selectedFile);
    onChange && onChange([selectedFile]);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    accept, // Uses accept with drag & drop
    maxSize, // Rejects files larger than maxSize
    disabled, // Drop is prohibited if true
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        className="group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={accept} // Restricts file type
          disabled={disabled} // Uploading files is prohibited if true
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="relative w-full">
          {file && (
            <motion.div
              className={cn(
                'relative overflow-hidden z-40 bg-(--bg-soft-blue) flex flex-col items-start justify-start md:h-24 p-4 w-full mx-auto rounded-md',
                'shadow-sm'
              )}
            >
              <div className="flex justify-between w-full items-center gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  title={file.name}
                  className="text-base text-(--text-primary)truncate max-w-xs"
                >
                  {file.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-(--text-primary) bg-(--bg-slate-100) shadow-input"
                >
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </motion.p>
              </div>

              <div className="flex gap-5 text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-(--text-primary)">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="px-2 py-1 rounded-md bg-(--bg-slate-100)"
                >
                  {file.type}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                >
                  modified {new Date(file.lastModified).toLocaleDateString()}
                </motion.p>
              </div>
            </motion.div>
          )}
          {!file && (
            <motion.div
              layoutId="file-upload"
              variants={mainVariant}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                'relative z-40 bg-(--bg-soft-blue) border-4 border-dotted border-(--brand-primary) flex items-center justify-center w-full mx-auto rounded-md px-6 py-7',
                emptyStateClassName
              )}
            >
              {isDragActive ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neutral-600 flex flex-col items-center"
                >
                  Drop it
                  <IconUpload className="h-4 w-4 text-neutral-600" />
                </motion.p>
              ) : (
                <div
                  className={`flex items-center justify-center gap-2 text-base text-(--text-secondary) ${uploadClassName}`}
                >
                  {children}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

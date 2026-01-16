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
}: {
  onChange?: (files: File[]) => void;
  children: React.ReactNode;
  uploadClassName: string;
  emptyStateClassName: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const selectedFile = newFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    onChange && onChange([selectedFile]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
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
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="relative w-full">
          {file && (
            <motion.div
              className={cn(
                'relative overflow-hidden z-40 bg-(--bg-soft-blue) dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 w-full mx-auto rounded-md',
                'shadow-sm'
              )}
            >
              <div className="flex justify-between w-full items-center gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  title={file.name}
                  className="text-base text-(--text-primary) dark:text-neutral-300 truncate max-w-xs"
                >
                  {file.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-(--text-primary) dark:text-white bg-(--border-default) dark:bg-neutral-800 shadow-input"
                >
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </motion.p>
              </div>

              <div className="flex gap-5 text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-(--text-primary) dark:text-neutral-400">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="px-2 py-1 rounded-md bg-(--border-default) dark:bg-neutral-800"
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
                'relative z-40 bg-(--bg-soft-blue) dark:bg-neutral-800 border-4 border-dotted border-(--brand-primary) flex items-center justify-center w-full mx-auto rounded-md px-6 py-7',
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
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
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

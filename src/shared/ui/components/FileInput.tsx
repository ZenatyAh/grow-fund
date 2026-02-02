import { FileUpload } from '@/components/ui/file-upload';
import { FileInputProps } from '@/interfaces';
import { cn } from '@/lib/utils';

const FileInput = ({
  uploadVariant = 'inline',
  uploadClassName = '',
  emptyStateClassName = '',
  uploadIconWrapperSize = 65,
  uploadIconWrapperClassName,
  UploadIcon,
  uploadIconSize = 24,
  uploadTitle,
  uploadSubTitle,
  onFileChange,
  accept,
  maxSize,
  disabled,
}: FileInputProps) => {
  const isStacked = uploadVariant === 'stacked';

  return (
    <FileUpload
      onChange={onFileChange}
      uploadClassName={uploadClassName}
      emptyStateClassName={emptyStateClassName}
      accept={accept}
      maxSize={maxSize}
      disabled={disabled}
    >
      <div
        className={cn(
          'flex items-center justify-center gap-3',
          isStacked && 'flex-col text-center'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-(--bg-slate-100) dark:bg-(--neutral-dark)',
            uploadIconWrapperClassName
          )}
          style={{
            width: uploadIconWrapperSize ?? 65,
            height: uploadIconWrapperSize ?? 65,
          }}
        >
          {UploadIcon && (
            <UploadIcon
              size={uploadIconSize}
              className="text-(--text-primary) dark:text-(--bg-slate-100)"
            />
          )}
        </div>
        <div className="text-(--text-secondary) dark:text-(--gray-medium) space-y-2">
          {uploadTitle && <p className="font-medium">{uploadTitle}</p>}
          {uploadSubTitle && <p className="text-sm">{uploadSubTitle}</p>}
        </div>
      </div>
    </FileUpload>
  );
};

export default FileInput;

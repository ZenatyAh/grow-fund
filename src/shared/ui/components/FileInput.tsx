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
  uploadIconClassName,
  uploadTitle,
  uploadSubTitle,
  onFileChange,
  accept,
  maxSize,
  disabled,
  file,
}: FileInputProps) => {
  const isStacked = uploadVariant === 'stacked';

  return (
    <FileUpload
      file={file}
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
            'flex items-center justify-center rounded-full bg-(--bg-slate-100)',
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
              className={`text-(--text-primary) ${uploadIconClassName}`}
            />
          )}
        </div>
        <div className="text-(--text-secondary) space-y-2">
          {uploadTitle && <p className="font-medium">{uploadTitle}</p>}
          {uploadSubTitle && <p className="text-sm">{uploadSubTitle}</p>}
        </div>
      </div>
    </FileUpload>
  );
};

export default FileInput;

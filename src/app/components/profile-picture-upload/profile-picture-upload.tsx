import {useEffect, useMemo, useState} from "react";
import {useDropzone, type Accept} from "react-dropzone";
import {Button} from "@/app/components/ui";
import {cn} from "@/app/libs/utils.ts";

export type UploadFileType = "image" | "audio" | "video" | "any";

export interface ProfilePictureUploadProps {
    className?: string;
    label?: string;
    helperText?: string;
    fileType?: UploadFileType;
    maxFiles?: number;
    fieldName?: string;
    disabled?: boolean;
    files?: File[];
    onChange?: (files: File[], formData: FormData) => void;
    texts?: {
        dragIdle?: string;
        dragActive?: string;
        allowedSummary?: string;
        selectFiles?: string;
        removeFile?: string;
        previewAlt?: string;
    };
}

const ACCEPTED_FILE_TYPES: Record<Exclude<UploadFileType, "any">, Accept> = {
    image: {"image/*": []},
    audio: {"audio/*": []},
    video: {"video/*": []},
};

const TYPE_LABELS: Record<UploadFileType, string> = {
    image: "images",
    audio: "audio files",
    video: "video files",
    any: "files",
};

export function createMultipartFormData(files: File[], fieldName = "file") {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append(fieldName, file);
    });

    return formData;
}

export function ProfilePictureUpload({
    className,
    label = "Upload file",
    helperText,
    fileType = "image",
    maxFiles = 1,
    fieldName = "file",
    disabled = false,
    files,
    onChange,
    texts,
}: ProfilePictureUploadProps) {
    const [internalFiles, setInternalFiles] = useState<File[]>(files ?? []);
    const selectedFiles = files ?? internalFiles;

    useEffect(() => {
        if (files) {
            setInternalFiles(files);
        }
    }, [files]);

    const previewFile = useMemo(() => {
        if (fileType !== "image" || selectedFiles.length === 0) {
            return null;
        }

        return selectedFiles[0];
    }, [fileType, selectedFiles]);

    const previewUrl = useMemo(() => {
        if (!previewFile) {
            return null;
        }

        return URL.createObjectURL(previewFile);
    }, [previewFile]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const updateFiles = (nextFiles: File[]) => {
        if (!files) {
            setInternalFiles(nextFiles);
        }

        onChange?.(nextFiles, createMultipartFormData(nextFiles, fieldName));
    };

    const onDrop = (acceptedFiles: File[]) => {
        const nextFiles = acceptedFiles.slice(0, maxFiles);
        updateFiles(nextFiles);
    };

    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        accept: fileType === "any" ? undefined : ACCEPTED_FILE_TYPES[fileType],
        disabled,
        maxFiles,
        multiple: maxFiles > 1,
        noClick: true,
        onDrop,
    });

    const removeFile = (indexToRemove: number) => {
        updateFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="space-y-1">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{label}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {helperText ?? `Drop up to ${maxFiles} ${TYPE_LABELS[fileType]} here or browse from your device.`}
                </p>
            </div>

            <div
                {...getRootProps()}
                className={cn(
                    "rounded-2xl border border-dashed p-5 transition-colors",
                    "bg-zinc-50 border-zinc-300 dark:bg-zinc-950/40 dark:border-zinc-700",
                    isDragActive && "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30",
                    disabled && "cursor-not-allowed opacity-60",
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                        <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:bg-zinc-900 dark:text-zinc-100">
                        {isDragActive ? (texts?.dragActive ?? "Drop files here") : (texts?.dragIdle ?? "Drag and drop files")}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {texts?.allowedSummary ?? `Allowed: ${TYPE_LABELS[fileType]} | Max files: ${maxFiles}`}
                    </p>
                    <Button type="button" variant="neutral" onClick={open} disabled={disabled}>
                        {texts?.selectFiles ?? "Select files"}
                    </Button>
                </div>
            </div>

            {previewUrl && (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                    <img
                        src={previewUrl}
                        alt={texts?.previewAlt ?? "Selected profile preview"}
                        className="h-52 w-full object-cover"
                    />
                </div>
            )}

            {selectedFiles.length > 0 && (
                <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                        <div
                            key={`${file.name}-${file.lastModified}-${index}`}
                            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                    {file.name}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="neutral"
                                size="sm"
                                onClick={() => removeFile(index)}
                                disabled={disabled}
                            >
                                {texts?.removeFile ?? "Remove"}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

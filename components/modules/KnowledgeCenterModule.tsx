"use client";

import { FileText } from "lucide-react";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { KnowledgeDocument } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";

export function KnowledgeCenterModule({ documents }: { documents: KnowledgeDocument[] }) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(documents.map((document) => document.name));

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const names = Array.from(event.target.files ?? []).map((file) => file.name);
    if (names.length) {
      setUploadedFiles((current) => [...names, ...current].slice(0, 5));
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-teal bg-white text-center transition hover:bg-field">
        <OmegaIconView icon="upload" className="h-6 w-6 text-teal" />
        <span className="px-4 text-sm font-semibold">Upload PDFs, DOCX, CSV, Excel, rules, or history</span>
        <input type="file" multiple className="sr-only" onChange={onUpload} />
      </label>
      <div className="rounded-lg border border-line bg-panel p-4">
        <p className="text-sm font-semibold">{uploadedFiles.length} mock files staged</p>
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file) => (
            <div key={file} className="flex items-center gap-2 border-t border-line pt-2 text-sm first:border-t-0 first:pt-0">
              <FileText className="h-4 w-4 shrink-0 text-teal" />
              <span className="min-w-0 truncate">{file}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

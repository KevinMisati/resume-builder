"use client";

import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { deleteResume } from "./actions";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ResumePreviewDownLoad from "@/components/ResumePreviewDownload";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {

    const wasUpdated = resume.updatedAt !== resume.createdAt;

    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
      const element = contentRef.current;

      if (!element) {
        console.error("Content reference is null");
        return;
      }

      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true, // For cross-origin assets
        });

        const pdf = new jsPDF("portrait", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scaleFactor = pdfWidth / canvasWidth;
        const totalHeight = canvasHeight * scaleFactor;

        let currentHeight = 0;

        while (currentHeight < totalHeight) {
          const sliceHeight = Math.min(totalHeight - currentHeight, pdfHeight);

          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvasWidth;
          sliceCanvas.height = sliceHeight / scaleFactor;

          const context = sliceCanvas.getContext("2d");
          context.drawImage(
            canvas,
            0,
            currentHeight / scaleFactor,
            canvasWidth,
            sliceCanvas.height,
            0,
            0,
            canvasWidth,
            sliceCanvas.height,
          );

          const imgData = sliceCanvas.toDataURL("image/png");

          if (currentHeight === 0) {
            pdf.addImage(
              imgData,
              "PNG",
              0,
              0,
              pdfWidth,
              (sliceCanvas.height * pdfWidth) / canvasWidth,
            );
          } else {
            pdf.addPage();
            pdf.addImage(
              imgData,
              "PNG",
              0,
              0,
              pdfWidth,
              (sliceCanvas.height * pdfWidth) / canvasWidth,
            );
          }

          currentHeight += sliceHeight;
        }

        pdf.save(`${resume.title || "Resume"}.pdf`);
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      }
    };


  return (
    <div className="group relative h-[100vh] w-full overflow-hidden rounded-lg border border-transparent bg-gray-200 bg-secondary p-3 transition-colors hover:border-border md:w-1/2">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />

          <ResumePreviewDownLoad
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="left-0 shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={handleDownload} />
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function MoreMenu({ resumeId,onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5  transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

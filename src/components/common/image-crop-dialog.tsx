"use client";

import { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { CropIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCroppedImg } from "@/lib/cropImage";

interface ImageCropDialogProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

export function ImageCropDialog({
  open,
  imageSrc,
  onClose,
  onCropComplete,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChangeHandler = useCallback((location: Point) => {
    setCrop(location);
  }, []);

  const onZoomChangeHandler = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const onCropCompleteHandler = useCallback(
    (_: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, {
        fileName: "profile.jpg",
        outputSize: 512,
        mimeType: "image/jpeg",
        quality: 0.85,
      });
      if (croppedFile) {
        onCropComplete(croppedFile);
      }
      onClose();
    } catch (error) {
      console.error("Crop failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>প্রোফাইল ছবি ক্রপ করুন</DialogTitle>
        </DialogHeader>

        <div className="relative mx-auto h-80 w-full overflow-hidden rounded-lg bg-black/5">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChangeHandler}
            onZoomChange={onZoomChangeHandler}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        <div className="flex items-center gap-3 px-1">
          <CropIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary"
          />
          <span className="min-w-[3ch] text-xs tabular-nums text-muted-foreground">
            {zoom.toFixed(1)}x
          </span>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            বাতিল
          </Button>
          <Button type="button" onClick={handleCrop} disabled={isProcessing}>
            {isProcessing ? "ক্রপ হচ্ছে..." : "ক্রপ করুন"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

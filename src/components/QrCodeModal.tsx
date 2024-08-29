"use client";

import Image from "next/image";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import QRCode from "qrcode";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useHref } from "@/hooks/use-href";

export const QrCodeModal = () => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string>("");
  const href = useHref();

  const generate = () => {
    QRCode.toDataURL(href).then(setSrc);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={generate} size={"icon"}>
          <Image
            src={"/assets/icons/qr-code.svg"}
            height={28}
            width={28}
            alt="qr-code"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">smart link</DialogTitle>
          <DialogDescription>
            Scan <span className="font-bold text-green-500">QR</span> code to
            visit patient's apportionment page.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-6">
          <Image
            src={src}
            height={300}
            width={300}
            alt="qr-code"
            className="size-[300px] mx-auto rounded-xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

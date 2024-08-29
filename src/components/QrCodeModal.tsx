"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { useHref } from "@/hooks/use-href";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useTranslations } from "next-intl";

export const QrCodeModal = () => {
  const t = useTranslations("Appointment");
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
          <DialogTitle className="capitalize">{t("qrModal.title")}</DialogTitle>
          <DialogDescription>{t("qrModal.subTitle")}</DialogDescription>
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

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Loading() {
  const t = useTranslations("Loading");
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
      {t("loading")}
    </div>
  );
}

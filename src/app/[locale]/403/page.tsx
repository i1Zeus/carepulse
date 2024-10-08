"use client";

import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Custom403() {
  const t = useTranslations("Forbidden");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="403 Forbidden - Access Denied" />
      </Head>
      <div className="flex items-center justify-center h-screen max-h-screen overflow-hidden">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Link href="/">
              <Image
                src="/assets/icons/logo-full.svg"
                height={1000}
                width={1000}
                alt="patient"
                className="w-fit h-10 mb-12"
              />
            </Link>
            <div className="relative p-5">
              <h1 className="text-[100px] md:text-[200px] opacity-10 font-bold text-center animate-pulse text-dark-600">
                {t("h1")}
              </h1>

              <p className="opacity-60 text-[20px] sm:text-[30px] lg:text-7xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute font-bold truncate h-[45px] md:h-[90px]">
                {t("p")}
              </p>
              <p className="opacity-35 text-sm text-center">{t("p2")}</p>
            </div>

            <Link href="/" className="w-full">
              <Button size={"lg"} className="w-full">
                {t("btn")}
              </Button>
            </Link>

            <p className="justify-items-end text-dark-600 xl:text-left text-14-regular flex justify-between mt-20">
              © 2024 CarePulse
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

"use client";

import { Button } from "@/src/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="404 Page Not Found" />
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
                404
              </h1>

              <p className="opacity-60 text-[30px] md:text-7xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute font-bold truncate h-[45px] md:h-[90px]">
                Page Not Found
              </p>
              <p className="opacity-35 text-sm text-center">
                The page you are looking for does not exist or has been moved.
              </p>
            </div>

            <div className="md:flex-row sm:pt-0 flex flex-col items-center justify-center gap-3 pt-5">
              <Link href="/" className="sm:w-fit w-full">
                <Button size={"lg"} className="sm:w-fit w-full">
                  Go Home
                </Button>
              </Link>
              <p className="text-sm font-bold text-center opacity-50">OR</p>
              <Button
                size={"lg"}
                variant={"secondary"}
                onClick={handleGoBack}
                className="sm:w-fit w-full"
              >
                Go Back
              </Button>
            </div>

            <div className="text-14-regular flex justify-between mt-20">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 CarePluse
              </p>
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Custom404;

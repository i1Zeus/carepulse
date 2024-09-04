"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "../routing";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
  className?: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  className,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // @ts-expect-error -- TypeScript
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        "fixed top-3 right-3 md:top-5 md:right-5 rounded-full bg-green-500/80 hover:bg-green-500 duration-100 transition-all font-semibold flex justify-center items-center size-10 md:w-14 md:h-14 text-xl",
        className
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="appearance-none bg-transparent size-full text-center outline-none text-black font-bold cursor-pointer"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
        aria-label={label}
      >
        {children}
      </select>
    </label>
  );
}

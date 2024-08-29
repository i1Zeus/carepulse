import Image from "next/image";
import Link from "next/link";

import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { StatCard } from "@/src/components/StatCard";
import { columns } from "@/src/components/table/columns";
import { DataTable } from "@/src/components/table/DataTable";
import { getTranslations } from "next-intl/server";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();
  const t = await getTranslations("AdminPage");

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">{t("dash")}</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">{t("hi")}</h1>
          <p className="text-dark-700">{t("start")}</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label={t("labelOne")}
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label={t("labelTwo")}
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label={t("labelThree")}
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;

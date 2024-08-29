import Image from "next/image";

import { getPatient } from "@/lib/actions/patient.actions";
import { AppointmentForm } from "@/src/components/forms/AppointmentForm";

import { QrCodeModal } from "@/src/components/QrCodeModal";
import * as Sentry from "@sentry/nextjs";
import { getTranslations } from "next-intl/server";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const t = await getTranslations("Appointment");
  const patient = await getPatient(userId);

  if (patient) Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex items-start justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="w-fit h-10 mb-12"
            />
            {/* Qr Code Modal Button. */}
            <QrCodeModal />
          </div>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright py-12 mt-10">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;

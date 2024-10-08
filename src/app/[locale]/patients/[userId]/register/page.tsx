import Image from "next/image";
import { redirect } from "next/navigation";

import { getPatient, getUser } from "@/lib/actions/patient.actions";
import RegisterForm from "@/src/components/forms/RegisterForm";

import { getTranslations } from "next-intl/server";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const t = await getTranslations("Register");
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="w-fit h-10 mb-12"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

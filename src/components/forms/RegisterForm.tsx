"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { Form, FormControl } from "@/src/components/ui/form";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SelectItem } from "../ui/select";

const RegisterForm = ({ user }: { user: User }) => {
  const t = useTranslations("Register");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const usedName = user.name.split(" ", 1)[0];

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name ? user.name : "",
      email: user.email ? user.email : "",
      phone: user.phone ? user.phone : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">{t("welcome") + " " + usedName}</h1>
          <p className="text-dark-700">{t("subTitle")}</p>
        </section>

        {/* Personal Information */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("personal")}</h2>
          </div>
          {/* NAME */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder={user.name}
            label={t("fullName")}
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          {/* EMAIL & PHONE */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label={t("email")}
              placeholder={user.email}
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label={t("phoneNumber")}
              placeholder={user.phone}
            />
          </div>
          {/* BirthDate & Gender */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label={t("dateOfBirth")}
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label={t("gender")}
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="h-11 xl:justify-between flex gap-6"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option: string, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          htmlFor={option}
                          className="capitalize cursor-pointer"
                        >
                          {option === "male" ? t("genderOpt.male") : ""}
                          {option === "female" ? t("genderOpt.female") : ""}
                          {option === "other" ? t("genderOpt.other") : ""}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          {/* Address & Occupation */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label={t("address")}
              placeholder={t("addPlaceholder")}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label={t("occupation")}
              placeholder={t("occupationPlaceholder")}
            />
          </div>
          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label={t("emergencyContactName")}
              placeholder={t("emergencyContactNamePlaceholder")}
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label={t("emergencyContactNumber")}
              placeholder={t("emergencyContactNumberPlaceholder")}
            />
          </div>{" "}
        </section>

        {/* Medical Information */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("medicalInfo")}</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label={t("primaryPhysician")}
            placeholder={t("primaryPhysicianPlaceholder")}
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="border-dark-500 border rounded-full"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label={t("insuranceProvider")}
              placeholder={t("insuranceProviderPlaceholder")}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label={t("insurancePolicyNumber")}
              placeholder={t("insurancePolicyNumberPlaceholder")}
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label={t("allergies")}
              placeholder={t("allergiesPlaceholder")}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label={t("currentMedications")}
              placeholder={t("currentMedicationsPlaceholder")}
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="xl:flex-row flex flex-col gap-6">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label={t("familyMedicalHistory")}
              placeholder={t("familyMedicalHistoryPlaceholder")}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label={t("pastMedicalHistory")}
              placeholder={t("pastMedicalHistoryPlaceholder")}
            />
          </div>
        </section>

        {/* Identification and Verification */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("identificationVerification")}</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label={t("identificationType")}
            placeholder={t("identificationTypePlaceholder")}
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type === "Birth Certificate"
                  ? t("IdentificationTypes.birthCertificate")
                  : ""}
                {type === "Driver's License"
                  ? t("IdentificationTypes.driverLicense")
                  : ""}
                {type === "Medical Insurance Card/Policy"
                  ? t("IdentificationTypes.medicalInsurance")
                  : ""}
                {type === "Military ID Card"
                  ? t("IdentificationTypes.militaryID")
                  : ""}
                {type === "National Identity Card"
                  ? t("IdentificationTypes.nationalIdentity")
                  : ""}
                {type === "Passport" ? t("IdentificationTypes.passport") : ""}
                {type === "Social Security Card"
                  ? t("IdentificationTypes.socialSecurity")
                  : ""}
                {type === "Student ID Card"
                  ? t("IdentificationTypes.studentId")
                  : ""}
                {type === "Voter ID Card"
                  ? t("IdentificationTypes.voterId")
                  : ""}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label={t("identificationNumber")}
            placeholder="A123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label={t("scannedIdentificationDocument")}
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        {/* Consent and Privacy */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">{t("consentAndPrivacy")}</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label={t("treatmentConsent")}
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label={t("disclosureConsent")}
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label={t("privacyConsent")}
          />
        </section>

        <SubmitButton isLoading={isLoading}>{t("submit")}</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;

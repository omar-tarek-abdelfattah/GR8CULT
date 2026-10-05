'use client';

import {
  Calendar,
  ShieldAlert,
  AlertCircle,
  Clock,
  FileCheck,
  ArrowUpRight,
} from "lucide-react";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";
import { useLanguage } from "@/context/LanguageContext";

export default function PoliciesSection() {
  const { openCalendar } = useCalendarModal();
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const stepsEn = [
    {
      step: "01",
      title: "PICK TIME SLOT",
      desc: "Open the studio calendar to check real-time availability and select your preferred date & time.",
      hasButton: true,
    },
    {
      step: "02",
      title: "CONFIRM DETAILS",
      desc: "Specify your service package and client details in the confirmation tray to register your booking.",
      hasButton: false,
    },
    {
      step: "03",
      title: "PAY DEPOSIT & LOCK IN",
      desc: "Transfer the required deposit via InstaPay or Vodafone Cash. Your session is officially locked into the calendar.",
      hasButton: false,
    },
  ];

  const stepsAr = [
    {
      step: "٠١",
      title: "اختر ميعاد السيشن",
      desc: "افتح كالندر الاستوديو عشان تشوف المواعيد المتاحة لايف وتختار اليوم والوقت المناسبين ليك.",
      hasButton: true,
    },
    {
      step: "٠٢",
      title: "أكد بياناتك",
      desc: "حدد باقة الخدمة اللي محتاجها وبياناتك الأساسية عشان نسجل طلب حجزك فوراً.",
      hasButton: false,
    },
    {
      step: "٠٣",
      title: "حول العربون وأكد الحجز",
      desc: "حول مبلغ العربون عن طريق إنستاباي أو فودافون كاش، وسيشنك بيتثبت رسمي في جدول الاستوديو.",
      hasButton: false,
    },
  ];

  const steps = isAr ? stepsAr : stepsEn;

  return (
    <section
      id="policies"
      className="py-20 border-t border-secondary/60 bg-background scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <span className="font-space text-xs sm:text-sm text-primary tracking-[0.25em] uppercase block mb-2 font-semibold">
            {isAr ? "التعليمات وسياسات الحجز" : "GUIDELINES & POLICIES"}
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase m-0 leading-none">
            {isAr ? "سياسات الحجز والاستوديو" : "BOOKING & POLICIES"}
          </h2>
          <p className="font-space text-xs sm:text-sm text-muted tracking-widest uppercase mt-2">
            {isAr
              ? "[ ٣ خطوات بسيطة // حجز فوري ع الكالندر وشروط العربون ]"
              : "[ 3 SIMPLE STEPS // INSTANT CALENDAR BOOKING & DEPOSIT TERMS ]"}
          </p>
        </div>

        {/* 3 Steps to Book */}
        <div className="mb-14 p-6 sm:p-8 border border-secondary/60 bg-[#080808] text-start">
          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide uppercase mb-3 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <span>{isAr ? "إزاي بحجز؟" : "HOW DO I BOOK?"}</span>
          </h3>
          <p className="font-space text-sm sm:text-base text-zinc-300 mb-6 leading-relaxed">
            {isAr
              ? "الحجز بياخد أقل من دقيقة مباشرة عن طريق كالندر الاستوديو اللايف:"
              : "Booking takes under 60 seconds directly through our live studio calendar:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="border border-secondary/50 hover:border-primary/60 bg-black/70 p-5 sm:p-6 flex flex-col justify-between transition-colors relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-secondary/40 pb-2">
                    <span className="font-bebas text-2xl sm:text-3xl text-primary tracking-wider">
                      {isAr ? `الخطوة ${s.step}` : `STEP ${s.step}`}
                    </span>
                    <span className="font-space text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                      0{idx + 1} / 03
                    </span>
                  </div>
                  <h4 className="font-bebas text-xl sm:text-2xl text-white tracking-wide uppercase mb-2">
                    {s.title}
                  </h4>
                  <p className="font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {s.hasButton && (
                  <button
                    type="button"
                    onClick={openCalendar}
                    className="mt-4 py-2.5 px-3.5 border border-primary/60 bg-primary/10 hover:bg-primary text-primary hover:text-white font-space text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>
                      {isAr ? "افتح مواعيد الكالندر" : "OPEN CALENDAR SLOTS"}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Policy Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
          {/* Final Delivery */}
          <div className="border border-secondary/60 bg-[#090909] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="w-6 h-6 text-primary" />
              <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase m-0">
                {isAr ? "مواعيد تسليم التراك النهائي" : "FINAL DELIVERY TIMELINE"}
              </h4>
            </div>

            <div className="space-y-3.5 font-space text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 bg-primary shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">
                    {isAr ? "نسخة الـ ROUGH MIX:" : "ROUGH MIX:"}
                  </strong>{" "}
                  {isAr
                    ? "بتستلمها عشان تراجع الاتجاه العام للصوت قبل الفاينال."
                    : "Delivered for review so you can verify the sonic direction."}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 bg-primary shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">
                    {isAr ? "تعديل مجاني (1 Free Revision):" : "1 FREE REVISION:"}
                  </strong>{" "}
                  {isAr
                    ? "مشمول مع كل باقات الميكس والماستر."
                    : "Included with every Mix + Master package."}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 bg-primary shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">
                    {isAr ? "الفاينال ميكس والماستر:" : "FINAL MIX + MASTER:"}
                  </strong>{" "}
                  {isAr ? "في العادي بيتسلم خلال " : "Normally delivered within "}
                  <strong className="text-primary font-bold">
                    {isAr ? "٤–٧ أيام عمل" : "4–7 DAYS"}
                  </strong>
                  .
                </span>
              </div>
            </div>
          </div>

          {/* Rescheduling & Additional Time */}
          <div className="border border-secondary/60 bg-[#090909] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase m-0">
                {isAr ? "تغيير الميعاد والوقت الإضافي" : "RESCHEDULING & ADDITIONAL TIME"}
              </h4>
            </div>

            <div className="space-y-3.5 font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-white uppercase tracking-wider block mb-1">
                  {isAr ? "تغيير ميعاد السيشن:" : "RESCHEDULING:"}
                </strong>
                {isAr
                  ? "محتاج تغير ميعادك؟ كلمنا في أقرب وقت. تغيير الميعاد بيكون حسب الأوقات المتاحة في الكالندر، والميعاد الجديد بيتأكد بعد مراجعته."
                  : "Need to change your session time? Contact us as early as possible. Rescheduling is subject to available slots. A new time is only confirmed after availability has been checked."}
              </p>
              <div className="border-t border-secondary/30 pt-3">
                <strong className="text-white uppercase tracking-wider block mb-1">
                  {isAr ? "الوقت الإضافي في الاستوديو:" : "ADDITIONAL TIME:"}
                </strong>
                {isAr
                  ? "ساعة التسجيل بـ ٥٠٠ جنيه (أقل حجز ساعتين). أي وقت زيادة بره وقت السيشن المحجوز بيتحسب كساعات إضافية. وأي شغل زيادة بره تفاصيل الباقة بيتم الاتفاق عليه وتسعيره قبل ما نبدأ فيه."
                  : "Recording is 500 EGP / HOUR (Min. 2 hours). Any time beyond the booked session is charged as Extra Time. Additional work outside the agreed package is quoted separately before proceeding."}
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="border border-secondary/60 bg-[#090909] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase m-0">
                {isAr ? "سياسة إلغاء الحجز" : "CANCELLATION POLICY"}
              </h4>
            </div>

            <div className="space-y-4 font-space text-xs sm:text-sm">
              <div className="p-3.5 bg-black border border-secondary/40">
                <span className="text-white font-bold uppercase tracking-wider block mb-1">
                  {isAr ? "الإلغاء خلال أول ٢٤ ساعة" : "CANCEL WITHIN 24 HOURS"}
                </span>
                <span className="text-zinc-300 leading-relaxed">
                  {isAr
                    ? "لو لغيت الحجز خلال أول ٢٤ ساعة من تأكيده، بيتم استرداد ٥٠٪ من قيمة العربون."
                    : "If you cancel within the first 24 HOURS, 50% of the deposit is refundable."}
                </span>
              </div>

              <div className="p-3.5 bg-black border border-primary/50">
                <span className="text-primary font-bold uppercase tracking-wider block mb-1">
                  {isAr ? "بعد مرور ٢٤ ساعة" : "AFTER 24 HOURS"}
                </span>
                <span className="text-zinc-300 leading-relaxed">
                  {isAr ? (
                    <>
                      بعد مرور ٢٤ ساعة، العربون بيكون{" "}
                      <strong className="text-white font-bold">غير قابل للاسترداد نهائياً</strong>.
                    </>
                  ) : (
                    <>
                      After 24 hours, the deposit is completely{" "}
                      <strong className="text-white font-bold">NON-REFUNDABLE</strong>.
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Deposit Policy */}
          <div className="border border-primary/80 bg-gradient-to-br from-[#160202] to-[#090909] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-primary" />
              <h4 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase m-0">
                {isAr ? "سياسة العربون" : "DEPOSIT POLICY"}
              </h4>
            </div>

            <div className="inline-block py-1.5 px-3.5 bg-primary text-white font-space text-xs sm:text-sm tracking-widest uppercase font-bold mb-4 shadow-[0_0_15px_rgba(214,0,0,0.4)]">
              {isAr ? "مفيش عربون = مفيش حجز" : "NO DEPOSIT = NO BOOKING"}
            </div>

            <p className="font-space text-xs sm:text-sm text-zinc-200 leading-relaxed mb-3">
              {isAr
                ? "اختيار ميعاد ع الكالندر مش معناه إن الحجز اتأكد. سيشنك بيتثبت رسمي أول ما العربون يوصل للاستوديو."
                : "Selecting a slot does not mean the booking is confirmed. Your session is only officially locked once the required deposit has been received."}
            </p>
            <p className="font-space text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {isAr
                ? "العربون بيحجز وقتك وبيشيل الميعاد ده من جدول المتاح لأي حد تاني."
                : "The deposit reserves your time and removes that slot from availability for other clients."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

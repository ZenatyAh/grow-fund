"use client";

import React from "react";
import Image from "next/image";

type CampaignOverview = {
  about?: string;
  description?: string;
  highlights?: string[];
};

type OverviewContentProps = {
  campaign: CampaignOverview;
};

const OverviewContent: React.FC<OverviewContentProps> = ({ campaign }) => {
  return (
    <div className="space-y-8 px-6 py-6">
      <section>
        <h3
          className="mb-3 text-base font-semibold text-slate-900"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "150%",
            letterSpacing: "0%",
          }}
        >
          معًا لمواجهة التحديات وتحقيق الأثر
        </h3>
        <p
          className="text-sm leading-7 text-slate-600"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "160%",
            letterSpacing: "0%",
            textAlign: "right",
            color: "#000000",
          }}
        >
          {campaign.about ?? campaign.description}
        </p>
      </section>

      <section>
        <h3
          className="mb-3 text-base font-semibold text-slate-900"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "150%",
            letterSpacing: "0%",
          }}
        >
          ماذا تقدم هذه الحملة؟
        </h3>
        <p
          className="text-sm leading-7 text-slate-600"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "160%",
            letterSpacing: "0%",
            textAlign: "right",
            color: "#000000",
          }}
        >
          هذه الحملة تركز على تقديم دعم ملموس للأسر المستحقة وفق احتياجاتها
          الأساسية، مع ضمان الوصول والشفافية.
        </p>
      </section>

      <section>
        <div className="relative h-[220px] overflow-hidden rounded-3xl sm:h-[280px]">
          <Image
            src="/images/home/background.png"
            alt="توزيع السلال"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {campaign.highlights?.length ? (
        <section>
          <h3
            className="mb-3 text-base font-semibold text-slate-900"
            style={{
              fontFamily: "Tajawal",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "150%",
              letterSpacing: "0%",
            }}
          >
            محتويات السلة الغذائية
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {campaign.highlights.map((item) => (
              <li
                key={item}
                style={{
                  fontFamily: "Tajawal",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "18px",
                  lineHeight: "160%",
                  letterSpacing: "0%",
                  textAlign: "right",
                  color: "#000000",
                }}
              >
                • {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="relative h-[240px] overflow-hidden rounded-3xl sm:h-[300px]">
          <Image
            src="/images/home/background.png"
            alt="محتويات السلة"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section>
        <h3
          className="mb-3 text-base font-semibold text-slate-900"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "150%",
            letterSpacing: "0%",
          }}
        >
          كيف تصنع مساهمتك فرقًا؟
        </h3>
        <p
          className="text-sm leading-7 text-slate-600"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "160%",
            letterSpacing: "0%",
            textAlign: "right",
            color: "#000000",
          }}
        >
          تبرعك لا يقدم غذاء فقط، بل يمنح الأمل. كل نجمة تضيفها تساعد في تأمين
          وجبات كريمة وتخفيف العبء عن الأسر المتعففة.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li
            style={{
              fontFamily: "Tajawal",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              textAlign: "right",
              color: "#000000",
            }}
          >
            • نجمة واحدة = وجبة ساخنة لطفل.
          </li>
          <li
            style={{
              fontFamily: "Tajawal",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              textAlign: "right",
              color: "#000000",
            }}
          >
            • 5 نجوم = سلة غذائية مصغرة.
          </li>
          <li
            style={{
              fontFamily: "Tajawal",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              textAlign: "right",
              color: "#000000",
            }}
          >
            • 10 نجوم = سلة غذائية كاملة.
          </li>
        </ul>
      </section>

      <section>
        <p
          className="text-sm leading-7 text-slate-600"
          style={{
            fontFamily: "Tajawal",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "160%",
            letterSpacing: "0%",
            textAlign: "right",
            color: "#000000",
          }}
        >
          كن أنت الأمل الذي ينتظرونه. تبرعك يصنع أثرًا كبيرًا ويمنح الأمان
          الغذائي لمن هم بأمسّ الحاجة.
        </p>
      </section>
    </div>
  );
};

export default OverviewContent;

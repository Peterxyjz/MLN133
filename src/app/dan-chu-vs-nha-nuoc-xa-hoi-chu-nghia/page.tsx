"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

const developmentSections = [
  {
    titleLeading: "CÁCH MẠNG THÁNG",
    highlight: "8",
    copy: "Nhà nước XHCN là kiểu nhà nước mới, đại diện cho quyền lực và lợi ích của đa số nhân dân lao động. Về kinh tế, nó gắn liền với chế độ công hữu tư liệu sản xuất và quản lý vì lợi ích chung. Về văn hóa - xã hội, nhà nước hướng tới công bằng, bình đẳng và sự phát triển toàn diện. Nhiệm vụ trung tâm là phát triển kinh tế, nâng cao đời sống nhân dân, tạo cơ sở cho thắng lợi của chủ nghĩa xã hội.",
    image: "/assets/dan-chu/9627b7650b8788dfe972debff1f56bd36a43e36c.png",
    reverse: false,
  },
  {
    titleLeading: "THỐNG NHẤT ĐẤT NƯỚC",
    highlight: undefined,
    copy: 'Giai đoạn 1975 – 1978 đánh dấu thắng lợi của sự nghiệp thống nhất đất nước. Đến năm 1978, nước ta chính thức mang tên Cộng hòa Xã hội Chủ nghĩa Việt Nam, nhưng trong các văn kiện Đảng hầu như chưa sử dụng cụm từ "dân chủ xã hội chủ nghĩa", mà thường nêu quan điểm "xây dựng chế độ làm chủ tập thể xã hội chủ nghĩa" gần với "chuyên chính vô sản".',
    image: "/assets/dan-chu/279ac6d45618567a5d837b177b274e8ac8f5cb57.png",
    reverse: true,
  },
  {
    titleLeading: "ĐỔI MỚI",
    highlight: undefined,
    copy: "Đại hội VI của Đảng (năm 1986) đề ra đường lối đổi mới toàn diện đất nước, trong đó nhấn mạnh phát huy dân chủ để tạo ra động lực mạnh mẽ cho phát triển đất nước. Đại hội khẳng định: \"Trong toàn bộ hoạt động của mình, Đảng phải quán triệt tư tưởng 'lấy dân làm gốc', xây dựng và phát huy quyền làm chủ của nhân dân lao động.\"",
    image: "/assets/dan-chu/a8e0fa1016123e027a05cf51b7f6f77188a93ea7.png",
    reverse: false,
  },
];

const democracyPillars = [
  {
    title: "Dân là gốc, là chủ, làm chủ",
    paragraphs: [
      "Dân chủ phải được thực hiện trong đời sống thực tiễn ở tất cả các cấp, mọi lĩnh vực của đời sống xã hội: về lĩnh vực kinh tế, chính trị, văn hóa, xã hội.",
      '"Nước ta là nước dân chủ. Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều là của dân. Công cuộc đổi mới, xây dựng là trách nhiệm của dân."',
    ],
    image: "/assets/dan-chu/f2780d9086654d1f6434d66de101ec9fd7af9811.png",
    reverse: false,
  },
  {
    title: "Dân chủ là mục tiêu của chế độ XHCN",
    paragraphs: [
      'Trong 8 đặc trưng của chủ nghĩa xã hội Việt Nam, đặc trưng tổng quát là: "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh."',
    ],
    image: "/assets/dan-chu/8791afd3ba4de05f2c9dee9e9f4ec1e45bb2a292.png",
    reverse: false,
  },
  {
    title: "Dân chủ là động lực để xây dựng chế độ mới",
    paragraphs: [
      "Xây dựng xã hội dân chủ là mục tiêu lâu dài. Dân chủ rộng rãi, tăng cường giám sát, minh bạch thông tin, cùng củng cố lòng tin của nhân dân.",
    ],
    image: "/assets/dan-chu/1a558fa5d99c1da82cc259ff07b6ec63aef0d6e6.png",
    reverse: false,
  },
  {
    title: "Dân chủ phải gắn với pháp luật",
    paragraphs: [
      "Dân chủ không phải tự do vô chính phủ, mà phải trong khuôn khổ pháp luật, tôn trọng kỷ luật xã hội, với nguyên tắc nền tảng là thượng tôn pháp luật.",
    ],
    image: "/assets/dan-chu/bfbb817d6305c19bb777136fb63a85058033c623.png",
    reverse: true,
  },
  {
    title: "Dân chủ là bản chất của chế độ XHCN",
    paragraphs: [
      "Nhân dân là chủ thể của quyền lực, còn Nhà nước và các cơ quan công quyền có trách nhiệm phục vụ nhân dân, đồng thời phải chịu sự giám sát của nhân dân để bảo đảm tính minh bạch, công bằng và vì lợi ích chung.",
    ],
    image: "/assets/dan-chu/0dc05d56e6cc73f05c60cefde74f95e8ffdbf9f1.png",
    reverse: true,
  },
];

export default function DemocracyPage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#121212] text-[#d9d9d9] relative overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/ban-co-biet/4a22a5e0295e170d8bbbfa3301b17b33dd1e379a.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/80 pointer-events-none"></div>

      <Header currentPath="/dan-chu-vs-nha-nuoc-xa-hoi-chu-nghia" />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-32 px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section
          id="hero"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible["hero"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#f3c554]/50 bg-[#f3c554]/10 px-5 py-2.5 backdrop-blur-sm mb-6">
                <div className="h-2.5 w-2.5 rounded-full bg-[#f3c554] animate-pulse"></div>
                <span className="font-inter text-sm font-bold text-[#f3c554] uppercase tracking-wider">
                  Chương 2
                </span>
              </div>
            </div>

            <h1 className="font-quicksand text-5xl font-extrabold text-white drop-shadow-2xl lg:text-7xl mb-8">
              <span className="bg-linear-to-r from-[#f3c554] via-[#ffd966] to-[#f3c554] bg-clip-text text-transparent animate-gradient">
                DÂN CHỦ XÃ HỘI CHỦ NGHĨA
                <br />Ở VIỆT NAM
              </span>
            </h1>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2 backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/10">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
              <Image
                src="/assets/dan-chu/e8073081f13a6b8f416dbaef61946c4e9bcb0329.png"
                alt="Phát biểu trước nhân dân"
                width={900}
                height={600}
                className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-1.5 bg-linear-to-b from-[#f3c554] to-[#ffd966] rounded-full"></div>
                <h2 className="font-quicksand text-4xl font-bold text-[#ffd966]">
                  SỰ RA ĐỜI, PHÁT TRIỂN
                </h2>
              </div>

              <p className="font-quicksand text-xl font-medium text-[#d9d9d9]/90 leading-relaxed">
                Chế độ dân chủ nhân dân ở nước ta được xác lập sau Cách mạng
                Tháng Tám năm 1945.
              </p>
            </div>
          </div>
        </section>

        {/* Development Sections */}
        <section className="space-y-24">
          {developmentSections.map((section, index) => (
            <div
              key={section.titleLeading}
              id={`section-${index}`}
              data-animate
              className={`grid items-center gap-12 md:grid-cols-2 backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-3xl border border-white/10 transition-all duration-1000 ${
                isVisible[`section-${index}`]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              {section.reverse ? (
                <>
                  <div className="relative group md:order-last">
                    <div className="absolute -inset-4 bg-linear-to-l from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
                    <Image
                      src={section.image}
                      alt={section.titleLeading}
                      width={900}
                      height={600}
                      className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-end gap-4">
                      <h3 className="font-quicksand text-4xl font-extrabold text-white lg:text-5xl">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {section.titleLeading}
                        </span>
                      </h3>
                      {section.highlight && (
                        <span className="font-quicksand text-[120px] lg:text-[180px] font-extrabold leading-none text-[#f3c554] opacity-60">
                          {section.highlight}
                        </span>
                      )}
                    </div>
                    <div className="h-1 w-24 bg-linear-to-r from-[#f3c554] to-transparent rounded-full"></div>
                    <p className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {section.copy}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
                    <Image
                      src={section.image}
                      alt={section.titleLeading}
                      width={900}
                      height={600}
                      className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-end gap-4">
                      <h3 className="font-quicksand text-4xl font-extrabold text-white lg:text-5xl">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {section.titleLeading}
                        </span>
                      </h3>
                      {section.highlight && (
                        <span className="font-quicksand text-[120px] lg:text-[180px] font-extrabold leading-none text-[#f3c554] opacity-60">
                          {section.highlight}
                        </span>
                      )}
                    </div>
                    <div className="h-1 w-24 bg-linear-to-r from-[#f3c554] to-transparent rounded-full"></div>
                    <p className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {section.copy}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </section>

        {/* Bản chất Section */}
        <section
          id="essence"
          data-animate
          className={`space-y-16 transition-all duration-1000 ${
            isVisible["essence"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <h2 className="font-quicksand text-4xl font-extrabold text-white lg:text-6xl mb-6">
              <span className="bg-linear-to-r from-[#f3c554] via-[#ffd966] to-[#f3c554] bg-clip-text text-transparent animate-gradient">
                BẢN CHẤT CỦA NỀN DÂN CHỦ
                <br />
                XHCN Ở VIỆT NAM
              </span>
            </h2>
            <div className="h-1.5 w-48 bg-linear-to-r from-transparent via-[#f3c554] to-transparent rounded-full mx-auto"></div>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2 backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-3xl border border-white/10">
            <p className="font-quicksand text-2xl font-medium text-[#d9d9d9]/90 leading-relaxed lg:text-3xl">
              Dân chủ xã hội chủ nghĩa là quyền lực thuộc về nhân dân, thực hiện
              quyền làm chủ trên cơ sở gắn với lợi ích chung.
            </p>
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-l from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
              <Image
                src="/assets/dan-chu/06c024ebbcf0eb3a1261c190bfcbefe2c67b3e6c.png"
                alt="Lãnh đạo và nhân dân"
                width={900}
                height={600}
                className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Democracy Pillars */}
        <section className="space-y-20">
          {democracyPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              id={`pillar-${index}`}
              data-animate
              className={`grid items-center gap-12 md:grid-cols-2 backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-3xl border border-white/10 transition-all duration-1000 ${
                isVisible[`pillar-${index}`]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {pillar.reverse ? (
                <>
                  <div className="space-y-6 md:order-last">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-1.5 bg-linear-to-b from-[#f3c554] to-[#ffd966] rounded-full"></div>
                      <h3 className="font-quicksand text-3xl font-extrabold text-white lg:text-4xl">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {pillar.title}
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-5 font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {pillar.paragraphs.map((paragraph, i) => (
                        <p
                          key={i}
                          className={
                            i > 0
                              ? "italic text-[#ffd966] border-l-4 border-[#f3c554]/50 pl-5"
                              : ""
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      width={900}
                      height={600}
                      className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      width={900}
                      height={600}
                      className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-1.5 bg-linear-to-b from-[#f3c554] to-[#ffd966] rounded-full"></div>
                      <h3 className="font-quicksand text-3xl font-extrabold text-white lg:text-4xl">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {pillar.title}
                        </span>
                      </h3>
                    </div>
                    <div className="space-y-5 font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {pillar.paragraphs.map((paragraph, i) => (
                        <p
                          key={i}
                          className={
                            i > 0
                              ? "italic text-[#ffd966] border-l-4 border-[#f3c554]/50 pl-5"
                              : ""
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </section>

        {/* Phương châm 4 Dân */}
        <section
          id="phuong-cham"
          data-animate
          className={`grid items-center gap-12 md:grid-cols-2 backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-3xl border border-white/10 transition-all duration-1000 ${
            isVisible["phuong-cham"]
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
            <Image
              src="/assets/dan-chu/c3785689e2f97c3392370180fa5313b40b256b5e.png"
              alt="Làm việc trong hội nghị"
              width={900}
              height={600}
              className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="space-y-6">
            <h3 className="font-quicksand text-4xl font-extrabold text-white">
              <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                Thực hiện phương châm:
              </span>
            </h3>
            <div className="space-y-4 font-quicksand text-xl font-medium text-[#d9d9d9]/90">
              {[
                {
                  title: "Dân biết",
                  desc: "Nhà nước công khai, minh bạch thông tin để nhân dân được biết.",
                },
                { title: "Dân bàn", desc: "Nhân dân tham gia bàn bạc, góp ý." },
                {
                  title: "Dân làm",
                  desc: "Nhân dân tham gia thực hiện, xây dựng.",
                },
                {
                  title: "Dân kiểm tra",
                  desc: "Nhân dân giám sát, đánh giá và bãi miễn cán bộ nếu không làm tròn trách nhiệm.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border-l-4 border-[#f3c554] hover:bg-black/40 transition-all"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#f3c554] flex items-center justify-center font-bold text-black text-sm">
                    {i + 1}
                  </div>
                  <p>
                    <span className="font-bold text-[#f3c554]">
                      {item.title}:
                    </span>{" "}
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="text-center backdrop-blur-sm bg-linear-to-r from-[#f3c554]/10 to-[#ffd966]/10 p-8 rounded-3xl border-2 border-[#f3c554]/30">
          <Link
            className="inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-[#f3c554] to-[#ffd966] px-8 py-4 font-inter text-lg font-bold text-black hover:shadow-2xl hover:shadow-[#f3c554]/50 hover:-translate-y-1 transition-all"
            href="/nha-nuoc-xa-hoi-chu-nghia"
          >
            <span>Tìm hiểu về Nhà nước pháp quyền XHCN</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </section> */}
      </main>

      <Footer
        decorationSrc="/assets/dan-chu/71_83.svg"
        className="bg-black/60 backdrop-blur-sm border-t border-white/10 relative z-10"
      />
    </div>
  );
}

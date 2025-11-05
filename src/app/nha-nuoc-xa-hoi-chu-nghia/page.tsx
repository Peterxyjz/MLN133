"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

const cards = [
  "/assets/nha-nuoc/e9d909a16ddbdee131a4f85c3bcab0ca743bb3a1.png",
  "/assets/nha-nuoc/f6541ccf7e91c7eebbed0caada6b18e37d44ada9.png",
  "/assets/nha-nuoc/d4909be95c31d175c831ed26388bc832a2dc9e60.png",
  "/assets/nha-nuoc/c3c741d7c49c8fddc75dee3ba074e9df2d17a738.png",
];

export default function SocialistStatePage() {
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

      <Header currentPath="/nha-nuoc-xa-hoi-chu-nghia" />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-32 px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section
          id="hero"
          data-animate
          className={`grid items-center gap-12 md:grid-cols-2 transition-all duration-1000 ${
            isVisible["hero"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-6 animate-slide-in-left">
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#f3c554]/50 bg-[#f3c554]/10 px-5 py-2.5 backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-[#f3c554] animate-pulse"></div>
                <span className="font-inter text-sm font-bold text-[#f3c554] uppercase tracking-wider">
                  Chương 1
                </span>
              </div>
            </div>

            <h1 className="font-quicksand text-5xl font-extrabold text-white drop-shadow-2xl lg:text-7xl lg:leading-tight">
              <span className="bg-linear-to-r from-[#f3c554] via-[#ffd966] to-[#f3c554] bg-clip-text text-transparent animate-gradient">
                NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA
              </span>
            </h1>

            <div className="space-y-4">
              <h2 className="font-quicksand text-2xl font-bold text-[#ffd966] lg:text-3xl">
                Sự ra đời của Nhà nước xã hội chủ nghĩa
              </h2>
              <div className="h-1 w-24 bg-linear-to-r from-[#f3c554] to-transparent rounded-full"></div>
            </div>

            <p className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-white/10 lg:text-xl">
              Tiếp tục xây dựng Nhà nước pháp quyền XHCN dưới sự lãnh đạo của
              Đảng, mang bản chất giai cấp công nhân, gắn bó với dân tộc và phục
              vụ nhân dân. Quyền lực nhà nước phải thống nhất, có sự phân công,
              phối hợp và kiểm soát giữa lập pháp, hành pháp, tư pháp, tránh
              chồng chéo hoặc lạm quyền...
            </p>
          </div>

          <div className="flex justify-center animate-slide-in-right">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/30 to-[#ffd966]/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <Image
                src="/assets/nha-nuoc/0bdfa266c75b9f1c8241978bef018799391fa4cd.png"
                alt="Nhà nước xã hội chủ nghĩa"
                width={1000}
                height={1000}
                className="relative h-auto w-full min-w-xl rounded-2xl shadow-2xl border-4 border-[#f3c554]/20 transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Bản chất */}
        <section
          id="ban-chat"
          data-animate
          className={`grid items-center gap-12 md:grid-cols-2 transition-all duration-1000 delay-200 ${
            isVisible["ban-chat"]
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="flex justify-center md:order-last animate-scale-in">
            <div className="space-y-6 backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-1.5 bg-linear-to-b from-[#f3c554] to-[#ffd966] rounded-full"></div>
                <h2 className="font-quicksand text-3xl font-bold text-[#f3c554] lg:text-4xl">
                  Bản chất của Nhà nước xã hội chủ nghĩa
                </h2>
              </div>

              <div className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 space-y-5 leading-relaxed">
                <p className="border-l-4 border-[#f3c554]/50 pl-5">
                  Nhà nước XHCN là kiểu nhà nước mới, đại diện cho quyền lực và
                  lợi ích của đa số nhân dân lao động. Về kinh tế, nó gắn liền
                  với chế độ công hữu tư liệu sản xuất và quản lý vì lợi ích
                  chung. Về văn hóa - xã hội, nhà nước hướng tới công bằng, bình
                  đẳng và sự phát triển toàn diện.
                </p>

                <div className="relative">
                  <div className="absolute -left-2 top-2 w-3 h-3 bg-[#f3c554] rounded-full animate-pulse"></div>
                  <p className="pl-5">
                    Nhiệm vụ trung tâm là phát triển kinh tế, nâng cao đời sống
                    nhân dân, tạo cơ sở cho thắng lợi của chủ nghĩa xã hội.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-l from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
              <Image
                src="/assets/nha-nuoc/0dc05d56e6cc73f05c60cefde74f95e8ffdbf9f1.png"
                alt="Hồ Chí Minh cùng công nhân"
                width={1000}
                height={1000}
                className="relative h-auto w-full min-w-xl shadow-2xl rounded-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Chức năng với Cards */}
        <section
          id="chuc-nang"
          data-animate
          className={`transition-all duration-1000 delay-300 ${
            isVisible["chuc-nang"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12 space-y-6">
            <div className="inline-block">
              <h2 className="font-quicksand text-4xl font-extrabold text-white lg:text-5xl mb-4">
                <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                  Chức năng Nhà nước xã hội chủ nghĩa
                </span>
              </h2>
              <div className="h-1.5 bg-linear-to-r from-transparent via-[#f3c554] to-transparent rounded-full"></div>
            </div>

            <p className="mt-6 font-quicksand text-xl font-medium text-[#d9d9d9]/90 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
              Chức năng của Nhà nước XHCN gồm đối nội, đối ngoại: chính trị,
              kinh tế, văn hóa, xã hội; vừa mang tính giai cấp vừa mang tính xã
              hội. Nhà nước XHCN coi trọng trên hết là công cụ bảo vệ cách mạng,
              đồng thời chú trọng xây dựng xã hội mới.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((src, index) => (
              <div
                key={src}
                className="group relative overflow-hidden rounded-2xl transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute inset-0 bg-[#f3c554]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <Image
                  src={src}
                  alt={`Chức năng ${index + 1}`}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="h-1 w-12 bg-[#f3c554] rounded-full mb-2 group-hover:w-20 transition-all"></div>
                  <p className="text-white font-inter font-semibold text-sm">
                    Chức năng {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Dân chủ */}
        <section
          id="dan-chu"
          data-animate
          className={`grid items-center gap-12 md:grid-cols-2 transition-all duration-1000 delay-400 ${
            isVisible["dan-chu"]
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/30 to-transparent rounded-3xl blur-2xl"></div>
              <Image
                src="/assets/nha-nuoc/956fe3b5f2118e59e3d061758c77cd819ce18f66.png"
                alt="Phát biểu trong hội trường"
                width={1000}
                height={1000}
                className="relative h-auto w-full min-w-xl rounded-2xl border-2 border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>

          <div className="backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="font-quicksand text-xl font-medium text-[#d9d9d9]/90 leading-relaxed space-y-5 lg:text-2xl">
              <div className="flex items-start gap-4">
                <svg
                  className="w-8 h-8 text-[#f3c554] shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  Trong nền dân chủ xã hội chủ nghĩa, nhân dân có điều kiện thực
                  hiện đầy đủ quyền lực chính trị; được công bằng, bình đẳng lựa
                  chọn đại diện, tham gia quản lý nhà nước và xã hội, đồng thời
                  giám sát, kiểm soát quyền lực để ngăn chặn tha hóa.
                </p>
              </div>

              <div className="pl-12 border-l-4 border-[#f3c554]/50">
                <p className="italic text-[#ffd966]">
                  Nếu nguyên tắc dân chủ bị vi phạm, quyền lực nhân dân sẽ bị
                  biến chất, dẫn đến độc tài, chuyên chế.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Công cụ thực thi */}
        <section
          id="cong-cu"
          data-animate
          className={`grid items-center gap-12 md:grid-cols-2 transition-all duration-1000 delay-500 ${
            isVisible["cong-cu"]
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="space-y-6 md:order-last backdrop-blur-sm bg-linear-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-[#f3c554]/10 px-4 py-2 rounded-full border border-[#f3c554]/30">
                <svg
                  className="w-5 h-5 text-[#f3c554]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-inter text-sm font-bold text-[#f3c554] uppercase">
                  Vai trò quan trọng
                </span>
              </div>

              <h2 className="font-quicksand text-3xl font-extrabold text-white lg:text-4xl">
                <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                  Công cụ thực thi quyền làm chủ của nhân dân
                </span>
              </h2>
            </div>

            <div className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 space-y-6 leading-relaxed">
              <div className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 bg-[#f3c554] rounded-full"></div>
                <p>
                  Nhà nước XHCN là công cụ quan trọng để hiện thực hóa dân chủ,
                  vừa thể chế hóa ý chí nhân dân thành pháp luật, vừa bảo vệ
                  quyền lợi hợp pháp bằng cơ chế pháp luật.
                </p>
              </div>

              <div className="bg-black/30 p-6 rounded-xl border-l-4 border-[#f3c554]">
                <p className="text-[#ffd966] italic">
                  Theo V.I. Lênin, sự phát triển của Nhà nước XHCN gắn liền với
                  việc mở rộng dân chủ, thu hút đông đảo nhân dân tham gia quản
                  lý. Nếu nhà nước đánh mất bản chất, dân chủ sẽ trở nên hình
                  thức, dẫn tới nguy cơ chuyên chế.
                </p>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 bg-[#f3c554] rounded-full"></div>
                <p>
                  Trong hệ thống chính trị XHCN, Nhà nước là trụ cột vững mạnh
                  để nhân dân xây dựng và bảo vệ Tổ quốc dưới sự lãnh đạo của
                  Đảng cộng sản.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-l from-[#f3c554]/30 to-transparent rounded-3xl blur-2xl"></div>
              <Image
                src="/assets/nha-nuoc/f2780d9086654d1f6434d66de101ec9fd7af9811.png"
                alt="Người dân lao động"
                width={900}
                height={800}
                className="relative h-auto w-full min-w-xl rounded-2xl border-2 border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer
        decorationSrc="/assets/nha-nuoc/111_179.svg"
        className="bg-black/60 backdrop-blur-sm border-t border-white/10 relative z-10"
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

const infoCards = [
  {
    icon: "🏥",
    title: "Y tế từ xa (Telehealth)",
    content:
      "Nhiều bệnh viện lớn tại Việt Nam đã triển khai các nền tảng thăm khám, tư vấn sức khỏe từ xa. Điều này giúp người dân ở vùng sâu, vùng xa có thể tiếp cận chuyên gia y tế tuyến trên mà không cần di chuyển, tiết kiệm chi phí và thời gian.",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/30",
  },
  {
    icon: "📋",
    title: "Hồ sơ sức khỏe điện tử",
    content:
      "Hiện nay, nhiều tỉnh thành đang triển khai hồ sơ sức khỏe điện tử cho người dân. Hồ sơ này giúp bác sĩ tra cứu nhanh lịch sử khám chữa bệnh, tiêm chủng, từ đó đưa ra chẩn đoán và phác đồ điều trị chính xác hơn.",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/30",
  },
  {
    icon: "🎓",
    title: "Giáo dục số (E-learning)",
    content:
      "Các trường học đang tăng cường sử dụng các hệ thống quản lý học tập (LMS) và nền tảng bài giảng điện tử. Điều này hỗ trợ việc học tập linh hoạt, giúp học sinh tự học, ôn tập mọi lúc và giáo viên cá nhân hóa nội dung giảng dạy.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-400/30",
  },
];

export default function DidYouKnowPage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);

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

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#f3c554]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float-delay"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float"></div>
      </div>

      <Header currentPath="/ban-co-biet" />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 sm:px-6 lg:px-8">
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
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#f3c554]/50 bg-[#f3c554]/10 px-6 py-3 backdrop-blur-sm mb-6">
                <svg
                  className="w-6 h-6 text-[#f3c554] animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-inter text-lg font-bold text-[#f3c554] uppercase tracking-wider">
                  Khám phá
                </span>
              </div>
            </div>

            <h1 className="font-quicksand text-5xl lg:text-7xl font-extrabold text-white drop-shadow-2xl mb-6">
              <span className="bg-linear-to-r from-[#f3c554] via-[#ffd966] to-[#f3c554] bg-clip-text text-transparent animate-gradient">
                BẠN CÓ BIẾT?
              </span>
            </h1>

            <div className="h-1.5 w-48 bg-linear-to-r from-transparent via-[#f3c554] to-transparent rounded-full mx-auto mb-8"></div>

            <p className="font-quicksand text-xl lg:text-2xl font-medium text-[#d9d9d9]/90 max-w-3xl mx-auto leading-relaxed">
              Ứng dụng công nghệ trong dân chủ và dịch vụ công
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section
          id="content"
          data-animate
          className={`grid items-center gap-12 lg:grid-cols-2 transition-all duration-1000 delay-200 ${
            isVisible["content"]
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/30 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <Image
                src="/assets/ban-co-biet/136910af473ad8296d0ad5b92f6b4e0952c37cb4.png"
                alt="Y tế số và giáo dục số"
                width={900}
                height={600}
                className="h-auto w-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {infoCards.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative backdrop-blur-sm bg-linear-to-br ${
                  card.color
                } p-6 rounded-2xl border-2 ${
                  card.borderColor
                } shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  activeCard === index ? "scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon Badge */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-linear-to-br from-[#f3c554] to-[#ffd966] rounded-2xl shadow-lg flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="pl-8">
                  <h3 className="font-inter text-xl lg:text-2xl font-extrabold text-white mb-3 group-hover:text-[#f3c554] transition-colors">
                    {card.title}
                  </h3>
                  <div className="h-1 w-16 bg-linear-to-r from-[#f3c554] to-transparent rounded-full mb-4"></div>
                  <p className="font-quicksand text-base lg:text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                    {card.content}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-[#f3c554]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Result Section */}
        <section
          id="result"
          data-animate
          className={`backdrop-blur-sm bg-linear-to-br from-black/60 via-[#f3c554]/10 to-black/60 p-10 lg:p-16 rounded-3xl border-2 border-[#f3c554]/30 shadow-2xl transition-all duration-1000 delay-400 ${
            isVisible["result"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="shrink-0 w-20 h-20 bg-linear-to-br from-[#f3c554] to-[#ffd966] rounded-2xl shadow-lg flex items-center justify-center transform hover:rotate-12 transition-transform">
              <svg
                className="w-10 h-10 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="font-quicksand text-3xl lg:text-4xl font-extrabold text-white mb-4">
                <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                  Kết quả đạt được:
                </span>
              </h2>
              <div className="h-1 w-24 bg-linear-to-r from-[#f3c554] to-transparent rounded-full mb-6"></div>
              <p className="font-quicksand text-xl lg:text-2xl font-medium text-[#d9d9d9]/90 leading-relaxed">
                Nâng cao chất lượng dịch vụ công trong lĩnh vực y tế và giáo
                dục; đảm bảo công bằng trong việc tiếp cận tri thức và chăm sóc
                sức khỏe cho mọi người dân Việt Nam.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section
          id="stats"
          data-animate
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-600 ${
            isVisible["stats"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {[
            {
              icon: "🏥",
              number: "100+",
              label: "Bệnh viện triển khai Y tế từ xa",
            },
            {
              icon: "📱",
              number: "63/63",
              label: "Tỉnh thành có Hồ sơ điện tử",
            },
            {
              icon: "🎓",
              number: "95%",
              label: "Trường học ứng dụng E-learning",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 text-center group"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform">
                {stat.icon}
              </div>
              <div className="font-inter text-5xl font-extrabold text-[#f3c554] mb-2">
                {stat.number}
              </div>
              <div className="font-quicksand text-lg font-medium text-[#d9d9d9]/80">
                {stat.label}
              </div>
            </div>
          ))}
        </section> */}
      </main>

      <Footer backgroundImage="/assets/home/111_183.svg" />
    </div>
  );
}

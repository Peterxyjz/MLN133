"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Thứ nhất",
    copy: "Xây dựng và hoàn thiện thể chế kinh tế thị trường định hướng XHCN. Đồng thời, cần hoàn thiện hệ thống pháp luật, đặc biệt về các loại tài sản mới như sở hữu trí tuệ... Song song với đó là cải cách hành chính mạnh mẽ, đơn giản hóa thủ tục và nâng cao hiệu quả môi trường kinh doanh.",
    image: "/assets/phat-huy/f060079f6dbec6c25e2075978e706f0a029176ee.png",
    reverse: false,
  },
  {
    title: "Thứ hai",
    copy: "Xây dựng Đảng Cộng sản Việt Nam trong sạch, vững mạnh, coi đây là điều kiện tiên quyết để phát triển nền dân chủ. Đồng thời, thực hiện nguyên tắc tập trung dân chủ, tự phê bình và phê bình, bảo đảm sự lãnh đạo đúng đắn của Đảng trong tiến trình xây dựng chủ nghĩa xã hội.",
    image: "/assets/phat-huy/1408f93e8b788c2a7164f27ebfc9b9999ae81968.png",
    reverse: true,
  },
  {
    title: "Thứ ba",
    copy: "Xây dựng Nhà nước pháp quyền XHCN vững mạnh. Nhà nước đặt dưới sự lãnh đạo của Đảng, thực thi quyền dân chủ của nhân dân trên mọi lĩnh vực. Tất cả chính sách, pháp luật phải xuất phát từ nguyện vọng, lợi ích chính đáng của nhân dân, bảo đảm tự do, danh dự và quyền công dân.",
    image: "/assets/phat-huy/a4795dc0fb24dd443c7dd4e0703ad7ec96b77b07.png",
    reverse: false,
  },
  {
    title: "Thứ tư",
    copy: "Nâng cao vai trò của các tổ chức chính trị - xã hội trong giám sát và phản biện xã hội. Các tổ chức này cần đổi mới hoạt động và bảo vệ quyền lợi hợp pháp của nhân dân, góp phần xây dựng Đảng, bảo vệ chính quyền và tăng cường khối đại đoàn kết toàn dân tộc.",
    image: "/assets/phat-huy/21745e401d476d597bd69f3b2e9b618e6901ebe4.png",
    reverse: true,
  },
  {
    title: "Thứ năm",
    copy: "Hoàn thiện cơ chế giám sát, công khai minh bạch thông tin. Song song đó, nâng cao dân trí và văn hóa pháp luật, giúp người dân có đủ hiểu biết và năng lực tham gia quản lý xã hội.",
    image: "/assets/phat-huy/1abfa7dba561ca8914639564e2bdd1c083e55833.png",
    reverse: false,
  },
];

const ruleSections = [
  {
    title: "Một",
    copy: "Tiếp tục xây dựng Nhà nước pháp quyền XHCN dưới sự lãnh đạo của Đảng là yêu cầu căn bản. Nhà nước pháp quyền ở Việt Nam mang bản chất giai cấp công nhân, phục vụ lợi ích của nhân dân.",
    image: "/assets/phat-huy/0036c937903d35f66cc69b52fca668c06cddf1f8.png",
    reverse: true,
  },
  {
    title: "Hai",
    copy: "Đẩy mạnh cải cách thể chế và đổi mới phương thức hoạt động của Nhà nước. Quốc hội cần được kiện toàn để thực sự phát huy vai trò cơ quan quyền lực cao nhất.",
    image: "/assets/phat-huy/2f1706022f9d71e1f390cf6cb55a0a1feeef86e7.png",
    reverse: false,
  },
  {
    title: "Ba",
    copy: "Xây dựng đội ngũ cán bộ, công chức trong sạch, có năng lực là điều kiện tiên quyết để xây dựng bộ máy tinh gọn và hiệu quả.",
    image: "/assets/phat-huy/f79159de52920b9d05f46e0ff2f6c2471b6294df.png",
    reverse: true,
  },
  {
    title: "Bốn",
    copy: "Đẩy mạnh phòng, chống tham nhũng, lãng phí và thực hành tiết kiệm. Cần hoàn thiện thể chế, cải cách hành chính để ngăn ngừa và xử lý kịp thời.",
    image: "/assets/phat-huy/a2e9d8e09812571adb62ae8182f0001348ff7040.png",
    reverse: false,
  },
];

export default function PromoteDemocracyPage() {
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

      <Header currentPath="/phat-huy-va-xay-dung" />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-32 px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section
          id="hero"
          data-animate
          className={`grid items-center gap-12 lg:grid-cols-2 transition-all duration-1000 ${
            isVisible["hero"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-8 backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-8 rounded-3xl border border-white/10">
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#f3c554]/50 bg-[#f3c554]/10 px-5 py-2.5 backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-[#f3c554] animate-pulse"></div>
                <span className="font-inter text-sm font-bold text-[#f3c554] uppercase tracking-wider">
                  Chương 3
                </span>
              </div>
            </div>

            <h1 className="font-quicksand text-4xl font-extrabold text-white drop-shadow-2xl leading-tight md:text-5xl lg:text-6xl">
              <span className="bg-linear-to-r from-[#f3c554] via-[#ffd966] to-[#f3c554] bg-clip-text text-transparent animate-gradient">
                Phát huy dân chủ xã hội chủ nghĩa ở Việt Nam hiện nay
              </span>
            </h1>

            <div className="space-y-4">
              <div className="h-1 w-24 bg-linear-to-r from-[#f3c554] to-transparent rounded-full"></div>
              <p className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed lg:text-xl">
                Hiện nay, để phát huy dân chủ xã hội chủ nghĩa, Việt Nam cần tập
                trung vào các nhiệm vụ trọng tâm sau:
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/30 to-transparent rounded-3xl blur-2xl"></div>
            <Image
              src="/assets/phat-huy/8a3eaafb85632e50cddab76e445c89a63b675e5a.png"
              alt="Tổng bí thư trong vòng tay nhân dân"
              width={900}
              height={600}
              className="relative h-auto w-full rounded-2xl shadow-2xl border-4 border-[#f3c554]/20 transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={step.title}
              id={`step-${index}`}
              data-animate
              className={`grid items-center gap-12 lg:grid-cols-2 transition-all duration-1000 ${
                isVisible[`step-${index}`]
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              {step.reverse ? (
                <>
                  <div className="lg:order-last backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#f3c554] to-[#ffd966] shadow-lg">
                        <span className="font-inter text-2xl font-extrabold text-black">
                          {index + 1}
                        </span>
                      </div>
                      <h2 className="font-quicksand text-4xl lg:text-5xl font-extrabold text-white">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {step.title}
                        </span>
                      </h2>
                    </div>
                    <div className="h-1 w-20 bg-linear-to-r from-[#f3c554] to-transparent rounded-full mb-6"></div>
                    <p className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-l from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
                    <Image
                      src={step.image}
                      alt={step.title}
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
                      src={step.image}
                      alt={step.title}
                      width={900}
                      height={600}
                      className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#f3c554] to-[#ffd966] shadow-lg">
                        <span className="font-inter text-2xl font-extrabold text-black">
                          {index + 1}
                        </span>
                      </div>
                      <h2 className="font-quicksand text-4xl lg:text-5xl font-extrabold text-white">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {step.title}
                        </span>
                      </h2>
                    </div>
                    <div className="h-1 w-20 bg-linear-to-r from-[#f3c554] to-transparent rounded-full mb-6"></div>
                    <p className="font-quicksand text-lg font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </section>

        {/* Divider */}
        <section
          id="divider"
          data-animate
          className={`text-center transition-all duration-1000 ${
            isVisible["divider"]
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="inline-block backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-8 rounded-3xl border-2 border-[#f3c554]/30">
            <h2 className="font-quicksand text-3xl lg:text-5xl font-extrabold text-white">
              <span className="bg-linear-to-r from-[#f3c554] via-[#ffd966] to-[#f3c554] bg-clip-text text-transparent animate-gradient">
                3.1 Xây dựng Nhà nước pháp quyền
                <br />
                xã hội chủ nghĩa hiện nay
              </span>
            </h2>
          </div>
        </section>

        {/* Rule Sections */}
        <section className="space-y-24">
          {ruleSections.map((rule, index) => (
            <div
              key={rule.title}
              id={`rule-${index}`}
              data-animate
              className={`grid items-center gap-12 lg:grid-cols-2 transition-all duration-1000 ${
                isVisible[`rule-${index}`]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {rule.reverse ? (
                <>
                  <div className="backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#f3c554] to-[#ffd966] shadow-lg">
                        <span className="font-inter text-2xl font-extrabold text-black">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="font-quicksand text-4xl lg:text-6xl font-extrabold text-white">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {rule.title}
                        </span>
                      </h3>
                    </div>
                    <div className="h-1 w-20 bg-linear-to-r from-[#f3c554] to-transparent rounded-full mb-6"></div>
                    <p className="font-quicksand text-lg lg:text-xl font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {rule.copy}
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-linear-to-r from-[#f3c554]/20 to-transparent rounded-3xl blur-xl"></div>
                    <Image
                      src={rule.image}
                      alt={rule.title}
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
                      src={rule.image}
                      alt={rule.title}
                      width={900}
                      height={600}
                      className="relative h-auto w-full rounded-2xl shadow-2xl border-2 border-white/10 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="backdrop-blur-sm bg-linear-to-br from-black/60 to-black/40 p-10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#f3c554] to-[#ffd966] shadow-lg">
                        <span className="font-inter text-2xl font-extrabold text-black">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="font-quicksand text-4xl lg:text-6xl font-extrabold text-white">
                        <span className="bg-linear-to-r from-[#f3c554] to-[#ffd966] bg-clip-text text-transparent">
                          {rule.title}
                        </span>
                      </h3>
                    </div>
                    <div className="h-1 w-20 bg-linear-to-r from-[#f3c554] to-transparent rounded-full mb-6"></div>
                    <p className="font-quicksand text-lg lg:text-xl font-medium text-[#d9d9d9]/90 leading-relaxed">
                      {rule.copy}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer backgroundImage="/assets/home/111_183.svg" />
    </div>
  );
}

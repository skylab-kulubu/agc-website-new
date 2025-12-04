import React from "react";

function About({ applicationUrl }) {
  return (
    <div id="hakkinda" className="flex flex-col md:flex-col lg:flex-row items-center py-20 px-6 lg:px-32 lg:pb-40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/50 -z-10"></div>

      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img
          src="assets/about/about_image.png"
          alt="About Us"
          className="relative w-full h-auto rounded-xl shadow-2xl transition duration-500"
        />
      </div>

      <div className="mt-12 lg:mt-0 lg:ml-16 flex flex-col items-center md:items-center lg:items-start max-w-screen-md mx-auto w-full lg:w-1/2">
        <div className="glass p-8 rounded-2xl border border-white/10 relative">
          <h2 className="text-3xl font-bold text-white mb-6">Hakkımızda</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            AlgoLab Gençlik Kodlama Yarışması (AGC), genç beyinleri algoritma ve programlama dünyasına teşvik etmek, problem çözme yeteneklerini geliştirmek ve onlara bu alanda bir kariyer yolu açmak amacıyla düzenlenmektedir. Her seviyeden katılımcıya açık olan yarışmamız, dostça bir rekabet ortamında bilgi ve deneyim paylaşımını hedefler.
          </p>
          <a
            href={applicationUrl || "#"}
            target={applicationUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="bg-white text-slate-900 py-3 px-10 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-white/20 duration-300"
          >
            Başvur
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;

import React from "react";

function About() {
  return (
    <div id="hakkinda" className="flex flex-col md:flex-col lg:flex-row items-center  py-6 px-6 lg:px-32 lg:pb-60 bg-[#2269A9]">
      <img
        src="assets/about/about_image.png"
        alt="About Us"
        className="w-full md:w-full lg:w-1/2 h-auto rounded-lg"
      />
      <div className="mt-10 lg:ml-10 flex flex-col items-center md:items-center lg:items-start max-w-screen-md mx-auto">
        <p className="text-lg text-white mb-4">
          AlgoLab Gençlik Kodlama Yarışması (AGC), genç beyinleri algoritma ve programlama dünyasına teşvik etmek, problem çözme yeteneklerini geliştirmek ve onlara bu alanda bir kariyer yolu açmak amacıyla düzenlenmektedir. Her seviyeden katılımcıya açık olan yarışmamız, dostça bir rekabet ortamında bilgi ve deneyim paylaşımını hedefler.
        </p>
        <button className="bg-[#FBFBFF] text-black py-2 px-8 rounded">
          Başvur
        </button>
      </div>
    </div>
  );
}

export default About;

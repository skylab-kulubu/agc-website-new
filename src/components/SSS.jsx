import { useState } from "react";

export default function SSS() {
  const [openItem, setOpenItem] = useState(2); // Third item open by default

  const faqItems = [
    {
      id: 0,
      question: "Yarışmaya kimler katılabilir?",
      answer:
        "Yarışmamız, üniversite öğrencileri başta olmak üzere kodlamaya ve algoritma problemlerine ilgi duyan herkese açıktır. Detaylı katılım koşulları için başvuru sayfamızı ziyaret edebilirsiniz.",
    },
    {
      id: 1,
      question: "Yarışma formatı nasıl olacak?",
      answer:
        "Yarışma, belirli bir süre içinde çözülmesi gereken algoritma ve programlama sorularından oluşacaktır. Sorular genellikle veri yapıları, algoritmalar ve problem çözme becerilerini ölçmeye yönelik olacaktır.",
    },
    {
      id: 2,
      question: "Kayıt ücreti var mı?",
      answer:
        "Hayır, yarışmamıza katılım tamamen ücretsizdir. Amacımız, daha fazla kişinin bu alanda kendini geliştirmesine olanak sağlamaktır.",
    },
    {
      id: 3,
      question: "Takım olarak katılabilir miyiz?",
      answer:
        "Evet, yarışmaya bireysel olarak katılabileceğiniz gibi, belirli kurallar çerçevesinde takım olarak da katılabilirsiniz. Takım katılım koşulları ve üye sayısı gibi detaylar duyurularımızda belirtilecektir.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div id="sss" className="bg-[#2269A9] flex flex-col items-center py-48 pb-56">
      {/* Logo */}
      <div className="mb-4 mr-auto ml-24">
        <img
          src="/assets/sss/sss_sticker.png"
          alt="SSS"
          className="w-auto h-56"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="w-full px-48 overflow-hidden">
        {faqItems.map((item, index) => (
          <div key={item.id} className={`overflow-hidden shadow-md`}>
            <div
              className={`flex justify-between items-center p-5 cursor-pointer ${
                item.id % 2 === 0
                  ? "bg-[#DDEBF8] text-[#071522]"
                  : "bg-[#0E2A44] text-white"
              } ${index === 0 ? "rounded-t-lg" : ""} 
              ${
                index === faqItems.length - 1 && openItem !== item.id
                  ? "rounded-b-lg"
                  : ""
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <span className="text-2xl">
                {openItem === item.id ? "−" : "+"}
              </span>
            </div>
            {openItem === item.id && (
              <div
                className={`p-5 ${
                  item.id % 2 === 0
                    ? "bg-[#DDEBF8] text-[#071522]"
                    : "bg-[#0E2A44] text-white"
                } ${index === faqItems.length - 1 && "rounded-b-lg"}`}
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";

export default function SSS() {
  const [openItem, setOpenItem] = useState(null); // No item open by default

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
    <div id="sss" className="flex flex-col items-center py-20 md:py-24 pb-32 md:pb-40">
      {/* Logo */}
      <div className="mb-12 md:mb-16 flex justify-center">
        <img
          src="/assets/sss/sss_sticker.png"
          alt="SSS"
          className="w-auto h-40 md:h-56 drop-shadow-xl"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="w-full max-w-4xl px-4">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className={`glass rounded-xl overflow-hidden transition-all duration-300 ${openItem === item.id ? 'bg-white/10 border-blue-500/30 shadow-lg shadow-blue-500/10' : 'hover:bg-white/5'}`}
            >
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className={`text-lg font-semibold transition-colors ${openItem === item.id ? 'text-blue-300' : 'text-white'}`}>
                  {item.question}
                </h3>
                <span className={`text-2xl transition-transform duration-300 ${openItem === item.id ? 'rotate-180 text-blue-400' : 'text-gray-400'}`}>
                  {openItem === item.id ? "−" : "+"}
                </span>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

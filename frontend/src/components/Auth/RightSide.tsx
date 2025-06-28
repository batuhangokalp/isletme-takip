import React from "react";

const RightSide = () => {
  return (
    <div className="hidden md:flex w-3/4 bg-gradient-to-br from-[#011926] to-[#064663] text-white flex-col items-center justify-center px-10">
      {/* Logo veya stilize ikon */}
      {/* <div className="mb-6">
        <img
          src="/logoB.png" 
          alt="Logo"
          className="w-14 h-14 rounded-full shadow-lg"
        />
      </div> */}

      {/* Başlık */}
      <h1 className="text-4xl font-bold mb-4 text-center leading-tight">
        Dijital Temizlik Takibi
      </h1>

      {/* Açıklama */}
      <p className="text-md text-center text-gray-200 max-w-md">
        Halı, kilim, yorgan... Hepsi kontrol altında. Müşterilerinizin
        siparişlerini kaydedin, takip edin, işletmenizi büyütün.
      </p>

      {/* İllüstrasyon veya daha profesyonel bir görsel */}
      <img
        src="/pictures/report.svg"
        alt="Hoş geldiniz"
        className="mt-20 w-80 max-w-xs rounded-lg shadow-2xl"
      />
    </div>
  );
};

export default RightSide;

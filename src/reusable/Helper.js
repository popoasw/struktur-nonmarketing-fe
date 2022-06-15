import React from "react";
import LanguageContext from "containers/languageContext";

// tampilan angka supaya tampil dengan separator ribuan
// untuk tampilan yang di ketik belum berhasil
export const GlbNumberFormat = (amount) => {
    if (amount === '' || amount === undefined || amount === 0  || amount === '0' || amount === null) {
      return amount;
    } 
    else {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

// merubah format tanggal inputan menjadi dd MMM yyyy
export const GlbFormatDate = (e) => {
    const date = new Date(e);    
    let language = React.useContext(LanguageContext);
    
    let monthNames = language.pageContent[language.pageLanguage].MonthList;
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    let year = date.getFullYear();
  
    let newDate = `${day}-${monthName}-${year}`;  
    return newDate;
  };
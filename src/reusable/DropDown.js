import React from "react";
import {
  CLabel,
  CSelect,
} from "@coreui/react";

/* popo 221006
   prop.label = yang akan di tampilkan di dropdown 
   prop.value = yang dipilih di option, yang akan di terima const 
   prop.options = list pilihan yang dapat dipakai (array)
   prop.onChange = perintah yang dilakukan kalau ketika ada perubahan
   prop.size = "sm" kecil, "lg" besar (default)
   
   notes : belum bisa dipakai, karena kalau array yang dilempar 
           memiliki key yang berbeda ( bukan value dan label) akan bermasalah
*/
export const Dropdown = (prop) => {
  return (
    <div className="mb-0">
      <CLabel>{prop.label}</CLabel>
      <CSelect 
        custom 
        value={prop.value} 
        onClick={prop.onClick} 
        onChange={prop.onChange} 
        size={prop.size}
        defaultValue={prop.defaultValue}
      >
        {prop.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </CSelect>
    </div>
  );
};
export default Dropdown;
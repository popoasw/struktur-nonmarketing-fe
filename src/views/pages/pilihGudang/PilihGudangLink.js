/* eslint-disable no-redeclare */
const staging = "https://staging-api.cfu.pharmalink.id/";
const production = "https://api.cfu.pharmalink.id/";

if (window.location.hostname.includes("staging-react")) {
  var url_allGudang = staging + "monitoring-gudang/GetAllGudang?type=allAuth";
} else if (window.location.hostname.includes("react")) {
  var url_allGudang =
    production + "monitoring-gudang/GetAllGudang?type=allAuth";
} else if (window.location.hostname.includes("localhost")) {
  var url_allGudang = staging + "monitoring-gudang/GetAllGudang?type=allAuth";
}

export { url_allGudang };

/* eslint-disable no-redeclare */
const staging = "https://staging-api.cfu.pharmalink.id/";
const production = "https://api.cfu.pharmalink.id/";

if (window.location.hostname.includes("staging-react")) {
  var url_login = staging + "auth/login";
  var url_changeForgottenPassword = staging + "auth/forgotpassword";
  var url_verifyOTP = staging + "auth/verifyotp";
  var url_changePassword = staging + "auth/changePassword";
  var url_loginChangePassword = staging + "auth/login/changePassword";
} else if (window.location.hostname.includes("react")) {
  var url_login = production + "auth/login";
  var url_changeForgottenPassword = production + "auth/forgotpassword";
  var url_verifyOTP = production + "auth/verifyotp";
  var url_changePassword = production + "auth/changePassword";
  var url_loginChangePassword = production + "auth/login/changePassword";
} else if (window.location.hostname.includes("localhost")) {
  var url_login = staging + "auth/login";
  var url_changeForgottenPassword = staging + "auth/forgotpassword";
  var url_verifyOTP = staging + "auth/verifyotp";
  var url_changePassword = staging + "auth/changePassword";
  var url_loginChangePassword = staging + "auth/login/changePassword";
}

export {
  url_login,
  url_changeForgottenPassword,
  url_verifyOTP,
  url_changePassword,
  url_loginChangePassword,
};

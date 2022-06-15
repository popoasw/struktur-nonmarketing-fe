/* eslint-disable default-case */
import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CInputCheckbox,
  CAlert,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as loginLink from "./LoginLink";
import { toast } from "react-toastify";

const Login = () => {
  var [loading, setLoading] = useState(false);
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [enterButton, setEnterButton] = useState(true);
  const [visible, setVisible] = React.useState(10);

  function handleUsername(e) {
    setUsername((username = e.target.value));
    if (username.length === 0 || password.length === 0) {
      setEnterButton((enterButton = true));
    } else {
      setEnterButton((enterButton = false));
    }
  }
  function handlePassword(e) {
    setPassword((password = e.target.value));
    if (username.length === 0 || password.length === 0) {
      setEnterButton((enterButton = true));
    } else {
      setEnterButton((enterButton = false));
    }
  }

  async function login() {
    const urlA = loginLink.url_login;
    setLoading((loading = true));
    var payload = {
      username: username,
      password: password,
    };

    const option = {
      method: "POST",
      json: true,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "",
      },
      body: JSON.stringify(payload.valueOf()),
    };

    let data = await fetch(urlA, option)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          if (response.status === 401) {
            <CAlert
              color="warning"
              show={visible}
              closeButton
              onShowChange={setVisible}
            >
              I will be closed in {visible} seconds!
              <CProgress
                striped
                color="warning"
                value={Number(visible) * 10}
                size="xs"
                className="mb-3"
              />
            </CAlert>;

            setLoading((loading = false));
          } else if (response.status === 500) {
            toast.error("Internal Server Error", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoading((loading = false));
          } else {
            toast.error("Internal Server Error", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoading((loading = false));
          }
          return true;
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading((loading = false));
        return true;
      });

    if (data === true) {
      return true;
    }

    if (data) {
      var token = data.headers.get("Authorization");
      data = await data.json();

      var data1 = data.data;
      var error = data.error;
      var metadata = data.metadata;

      if (error.status === false) {
        if (metadata.status === true) {
          window.localStorage.setItem("token", token);
          window.localStorage.setItem(
            "accessList",
            JSON.stringify(data1.mem_access)
          );
          window.localStorage.setItem("profile", JSON.stringify(data1));
          window.localStorage.setItem("isLoggedIn", "true");

          if (data1.mem_forcechangepasswordyn === "Y") {
            this.props.history.push({
              pathname: "/resetpassword",
              state: { ok: true },
            });
          } else {
            window.location.replace("/#/MasterStruktur");
            // if (window.localStorage.getItem("gudangID") === "") {
            //   window.location.replace("/#/pilihgudang");
            // }
          }
        } else {
          toast.error(metadata.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Koneksi Ke Server Gagal!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading((loading = false));
    }

    return true;
  }

  function showPassword() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      document.getElementById("checkbox").checked = true;
      x.type = "text";
    } else {
      document.getElementById("checkbox").checked = false;
      x.type = "password";
    }
  }

  function canBeSubmittedLogin() {
    return username.length !== 0 && password.length !== 0;
  }

  const isEnabledLogin = canBeSubmittedLogin();

  <script>
    {
      (document.onkeydown = (e) => {
        e = e || window.event;
        switch (e.key) {
          case "Enter":
            if (isEnabledLogin === true && enterButton === false) {
              login();
            }
            break;

          case "F1":
            showPassword();
            e.preventDefault();
            break;
        }
      })
    }
  </script>;

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <hr />
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="off"
                      value={username}
                      onChange={(e) => handleUsername(e)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="passwordInput"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => handlePassword(e)}
                    />
                  </CInputGroup>
                  <CRow className="mb-1">
                    <CCol>
                      <CInputCheckbox
                        className="ml-1"
                        id="checkbox"
                        onClick={(event) => showPassword(event)}
                      ></CInputCheckbox>
                      <CLabel className="ml-4">Show Password [F1]</CLabel>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CButton
                        disabled={loading || enterButton}
                        color="primary"
                        className="btn-block px-4"
                        onClick={() => login()}
                      >
                        {!loading && "Login"}
                        {loading && (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            size="lg"
                            className="fa-spin"
                          />
                        )}
                        {loading && " Loading"}
                      </CButton>
                    </CCol>
                    {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;

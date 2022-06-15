import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CLabel,
  CRow,
  CSpinner,
  CSelect,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faBan,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import * as pilihGudangLink from "./PilihGudangLink";

const PilihGudang = () => {
  var [result, setResult] = useState([]);
  var [dataAvailable, setDataAvailable] = useState("");
  var [pilihGudang, setPilihGudang] = useState("");
  var [namaGudang, setNamaGudang] = useState("");
  var [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const abortController = new AbortController();
    document.body.scrollTop = 0;

    const urlA = pilihGudangLink.url_allGudang;

    const option = {
      method: "GET",
      json: true,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: window.localStorage.getItem("token"),
      },
    };
    fetch(urlA, option, { signal: abortController.signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Koneksi ke server gagal!", "error");
        }
      })
      .then((data) => {
        var dataGudang = data.data;
        if (dataGudang !== null || dataGudang !== undefined) {
          setResult(dataGudang);
          setDataAvailable(true);
        } else {
          setResult([]);
          setDataAvailable(false);
        }
      });

    return function cancelRequest() {
      setResult([]);
      abortController.abort();
    };
  }, []);

  function setGroup(event) {
    var nama = result.find(function (element) {
      return element.Out_Code === event.target.value;
    });
    setPilihGudang((pilihGudang = event.target.value));
    setNamaGudang((namaGudang = nama.Out_Name));
  }

  function Masuk() {
    setLoading((loading = true));
    window.localStorage.setItem("gudangID", pilihGudang);
    window.localStorage.setItem("gudangName", namaGudang);
    if (pilihGudang !== "" || pilihGudang !== null) {
      window.location.href = "/#/dashboard";
    }
    window.location.href = "/#/login";
  }

  function logOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("accessList");
    window.location.href = "/#/login";
  }

  return (
    <>
      <CRow
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CCol sm={3} md={3} lg={3}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm={6}>
                  <h4 id="traffic" className="card-title mb-0">
                    <b>PILIH GUDANG</b>
                  </h4>
                </CCol>
                <CCol sm={6} align={"right"}>
                  <CButton
                    size={"sm"}
                    color="secondary"
                    onClick={() => logOut()}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> <b>KELUAR</b>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {result ? (
                (
                  <CSelect
                    defaultValue="Pilih Gudang"
                    onChange={(e) => setGroup(e)}
                  >
                    <option value="Pilih Gudang" disabled hidden id="pilih">
                      -- PILIH GUDANG --
                    </option>
                    {result &&
                      result.map((todo, i) => {
                        return (
                          <option key={i} value={todo.Out_Code}>
                            {todo.Out_Name}
                          </option>
                        );
                      })}
                  </CSelect>
                ) || (
                  <CRow style={{ textAlign: "center" }}>
                    <CCol style={{ textAlign: "center" }}>
                      <CSpinner color="success" size="sm" />
                    </CCol>
                  </CRow>
                )
              ) : dataAvailable ? (
                <CRow style={{ textAlign: "center" }}>
                  <CCol style={{ textAlign: "center" }}>
                    <h5>
                      <FontAwesomeIcon icon={faBan} /> GAGAL MENGAMBIL DATA
                      GUDANG
                    </h5>
                  </CCol>
                </CRow>
              ) : (
                <CRow style={{ textAlign: "center" }}>
                  <CCol style={{ textAlign: "center" }}>
                    <CSpinner color="success" size="sm" />
                  </CCol>
                </CRow>
              )}
            </CCardBody>
            <CCardFooter>
              <div className="pt-1" style={{ textAlign: "center" }}>
                <CCol style={{ textAlign: "center" }}>
                  <CButton
                    color="primary"
                    disabled={pilihGudang === undefined || pilihGudang === ""}
                    style={{ width: "150px", marginBottom: 0 }}
                    onClick={() => Masuk()}
                  >
                    {loading === true && (
                      <CLabel style={{ marginBottom: 0 }}>
                        <FontAwesomeIcon
                          icon={faCircleNotch}
                          size="lg"
                          className="fa-spin"
                        />
                        &nbsp; LOADING ...
                      </CLabel>
                    )}
                    {loading === false && (
                      <CLabel style={{ marginBottom: 0 }}>
                        <FontAwesomeIcon icon={faSignInAlt} /> <b>MASUK</b>
                      </CLabel>
                    )}
                  </CButton>
                </CCol>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default PilihGudang;

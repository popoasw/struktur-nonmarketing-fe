import React from "react";
import LanguageContext from "containers/languageContext";
import { Context } from "./MasterStruktur";
import { HpDateFormat } from "reusable/Helper";

export const PrintStructure = React.forwardRef((props, ref) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let date = HpDateFormat(new Date());
  return (
    <div ref={ref} className="mx-3 my-3">
      <h3><b>{language.pageContent[language.pageLanguage].MS.Print.structureTitle}</b></h3>

      <table className="mb-4">
        <tbody>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.structuretype}</th>
            <th width="800px"> : {ctx.state.structureType.label}</th>
            <th>{language.pageContent[language.pageLanguage].MS.Print.printuser}</th>
            <th> : {profile.mem_username}</th>
          </tr>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.period}</th>
            <th> : {ctx.state.periode}</th>
            <th>{language.pageContent[language.pageLanguage].MS.Print.printdate}</th>
            <th> : {date}</th>
          </tr>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.divisi}</th>
            <th> : {ctx.state.department.dpt_name}</th>
          </tr>
        </tbody>
      </table>

      <table className="mb-4" /* width="400px" */ >
        <tbody>
          <tr>
            <td colSpan={7}>==================================================================================================================</td>
          </tr>
          <tr>
            <th align="left" valign="top" width="65px">{language.pageContent[language.pageLanguage].MS.Data.nip }</th>
            <th align="left" valign="top">{language.pageContent[language.pageLanguage].MS.Data.name }</th>
            <th align="left" valign="top">{language.pageContent[language.pageLanguage].MS.Data.position }</th>
            <th align="left" valign="top" width="90px">{language.pageContent[language.pageLanguage].MS.Data.datein }</th>
            <th align="left" valign="top" width="90px">{language.pageContent[language.pageLanguage].MS.Data.dateout }</th>
            <th align="left" valign="top">{language.pageContent[language.pageLanguage].MS.Data.city }</th>
            <th align="left" valign="top">{language.pageContent[language.pageLanguage].MS.Data.branch }</th>
          </tr>
          <tr>
            <td colSpan={7}>==================================================================================================================</td>
          </tr>
          {ctx.state.strukturList.map((val, key) => {
            return (
                <tr key={key}>
                  <td align="left" valign="top">{val.nip}</td>
                  <td align="left" valign="top">{val.name}</td>
                  <td align="left" valign="top">{val.position_name}</td>
                  <td align="left" valign="top">{val.date_in}</td>
                  <td align="left" valign="top">{val.date_out}</td>
                  <td align="left" valign="top">{val.city_name}</td>
                  <td align="left" valign="top">{val.branch_name}</td>
                </tr>
            )
          })}
          <tr>
            <td colSpan={7}>==================================================================================================================</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
});

export const PrintHistory = React.forwardRef((props, ref) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let date = HpDateFormat(new Date());
  return (
    <div ref={ref} className="mx-3 my-3">
      <h3><b>{language.pageContent[language.pageLanguage].MS.Print.structureTitle}</b></h3>

      <table className="mb-4">
        <tbody>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.structuretype}</th>
            <th width="800px"> : {ctx.state.structureType.label}</th>
            <th>{language.pageContent[language.pageLanguage].MS.Print.printuser}</th>
            <th> : {profile.mem_username}</th>
          </tr>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.period}</th>
            <th> : {ctx.state.periode}</th>
            <th>{language.pageContent[language.pageLanguage].MS.Print.printdate}</th>
            <th> : {date}</th>
          </tr>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.divisi}</th>
            <th> : {ctx.state.department.dpt_name}</th>
          </tr>
          <tr>
            <th>{language.pageContent[language.pageLanguage].MS.structure}</th>
            <th> : {ctx.state.struktur.code_group} - {ctx.state.struktur.position_name}</th>
          </tr>
        </tbody>
      </table>

      <table className="mb-4" /* width="400px" */ >
        <tbody>
          <tr>
            <td colSpan={7}>==================================================================================================================</td>
          </tr>
          <tr>
            <th align="left" valign="top" width="50px">{language.pageContent[language.pageLanguage].MS.Data.nip }</th>
            <th align="left" valign="top" width="200px">{language.pageContent[language.pageLanguage].MS.Data.name }</th>
            <th align="left" valign="top" width="100px">{language.pageContent[language.pageLanguage].MS.Data.position }</th>
            <th align="left" valign="top" width="65px">{language.pageContent[language.pageLanguage].MS.Data.datein }</th>
            <th align="left" valign="top" width="65px">{language.pageContent[language.pageLanguage].MS.Data.dateout }</th>
            <th align="left" valign="top" width="100px">{language.pageContent[language.pageLanguage].MS.Data.city /*, _style: { width: '50px' } */ }</th>
            <th align="left" valign="top" width="100px">{language.pageContent[language.pageLanguage].MS.Data.branch }</th>
          </tr>
          <tr>
            <td colSpan={7}>==================================================================================================================</td>
          </tr>
          {/* {ctx.state.strukturList.map((val, key) => {
            return (
                <tr key={key}>
                  <td align="left" valign="top">{val.nip}</td>
                  <td align="left" valign="top">{val.name}</td>
                  <td align="left" valign="top">{val.position_name}</td>
                  <td align="left" valign="top">{val.date_in}</td>
                  <td align="left" valign="top">{val.date_out}</td>
                  <td align="left" valign="top">{val.city_name}</td>
                  <td align="left" valign="top">{val.branch_name}</td>
                </tr>
            )
          })} */}
          <tr>
            <td colSpan={7}>==================================================================================================================</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
});
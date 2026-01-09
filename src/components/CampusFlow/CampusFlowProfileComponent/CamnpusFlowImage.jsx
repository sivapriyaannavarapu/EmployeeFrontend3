import React from "react";
import styles from "../../CampusFlow/CampusFlowProfileComponent/CampusFlowHeader.module.css";

import phoneIcon from "assets/EmployeeProfileCrad/phoneIcon.svg";
import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
import dotsIcon from "assets/EmployeeProfileCrad/dotsicon.svg";
import mailIconOutline from "assets/RightSideInformation Icons/MailIconOutLine.svg";
import CampusImage from "../../../assets/campusFlowIcons/CampusImage.svg";
import maleicon from "../../../assets/campusFlowIcons/maleicon.svg";
import femaleicon from "../../../assets/campusFlowIcons/femaleicon.svg";

import { Tooltip } from "@mui/material";
import { normalizeLabel } from "../../../utils/labelutils.js";

const tooltipProps = {
  arrow: true,
  placement: "top",
  componentsProps: {
    tooltip: {
      sx: {
        backgroundColor: "#FFF",
        color: "#3425FF",
        fontSize: "0.75rem",
        fontWeight: 500,
        padding: "6px 10px",
        borderRadius: "6px",
        border: "1px solid #3425FF",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
      },
    },
    arrow: {
      sx: {
        color: "#FFF",
        "&::before": {
          border: "1px solid #3425FF",
        },
      },
    },
  },
};

const CamnpusFlowImage = ({ profile }) => {
  if (!profile) return null;

  const phoneNumber = profile.mobileNo ?? "";
  const email = profile.email ?? "";

  const address = [
    profile.plotNo,
    profile.area,
    profile.street,
    profile.landmark,
    profile.pinCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.employeeprofileContainer}>
      <figure className={styles.employeeProfile}>
        <img className={styles.emp_img} src={CampusImage} alt="Campus" />
      </figure>

      <div className={styles.infoSection}>
        <p className={styles.empId}>
          Campus Code:
          <br />
          <span>{profile.cmpsCode ?? "-"}</span>
        </p>

        {/* ✅ NORMALIZED */}
        <h3 className={styles.name}>
          {normalizeLabel(profile.cmpsName ?? "-")}
        </h3>

        <div className={styles.details}>
          <span className={styles.detail}>
            <img src={femaleicon} alt="Female" className={styles.icon} />
            <img src={maleicon} alt="Male" className={styles.icon} />
            {normalizeLabel(profile.educateTypeName ?? "-")}
          </span>
          <span className={styles.detail}>
            •&nbsp;&nbsp;&nbsp;{normalizeLabel(profile.cmpsType ?? "-")}
          </span>
        </div>

        <p className={styles.location}>
          {normalizeLabel(address) || "Address not available"}
        </p>

        <div className={styles.actions}>
          <button className={styles.designation}>
            {normalizeLabel(profile.orgName ?? "Organization")}
          </button>

          {/* PHONE */}
          <Tooltip
            {...tooltipProps}
            title={
              phoneNumber ? (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src={callIconOutLine} alt="Phone" style={{ width: 14 }} />
                  <span>{phoneNumber}</span>
                </div>
              ) : (
                "No number available"
              )
            }
          >
            <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
              <img src={phoneIcon} alt="Call" />
            </figure>
          </Tooltip>

          {/* EMAIL */}
          <Tooltip
            {...tooltipProps}
            title={
              email ? (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src={mailIconOutline} alt="Email" style={{ width: 14 }} />
                  <span>{email}</span>
                </div>
              ) : (
                "No email available"
              )
            }
          >
            <figure style={{ cursor: email ? "pointer" : "default" }}>
              <img src={dotsIcon} alt="Mail" />
            </figure>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CamnpusFlowImage;

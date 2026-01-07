import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "../CampusFlowBottomPart/CampusFlowEmpDetailsCard.module.css";

import rightDividerIcon from "assets/Family/dividerRightImg.svg";
import leftDividerIcon from "assets/Family/dividerLeftImg.svg";
import profileIcon from "assets/Family/profile.svg";
import EmployeeDetailsCard from "widgets/EmployeeDetailsCard/EmployeeDetailsCard";

import { campusFlowApi } from "../../../api/campusflow/campusflow";

/* 🔹 PAGINATION CONFIG (FIGMA MATCH) */
const PAGE_SIZE = 8;
const PAGE_WINDOW = 2;

const CampusFlowBioDataCard = () => {
  const { department } = useParams();
  const location = useLocation();
  const campusId =
    location.state?.campusId || sessionStorage.getItem("campusId");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  /* 🔹 FETCH EMPLOYEES */
  useEffect(() => {
    if (!department || !campusId) return;

    const fetchEmployees = async () => {
      setLoading(true);
      setPage(1); // reset page when department changes
      try {
        const res = await campusFlowApi.getEmployeesByDepartment(
          department,
          campusId
        );
        setEmployees(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Employees API error", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [department, campusId]);

  /* 🔹 TOTALS */
  const totalEntries = employees.length;
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE);

  /* 🔹 CURRENT PAGE DATA */
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageData = employees.slice(startIndex, endIndex);

  /* 🔹 ENTRY RANGE */
  const fromEntry = totalEntries === 0 ? 0 : startIndex + 1;
  const toEntry = Math.min(endIndex, totalEntries);

  /* 🔹 PAGE WINDOW (1-2, 3-4...) */
  const windowStart =
    Math.floor((page - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;
  const windowEnd = Math.min(
    windowStart + PAGE_WINDOW - 1,
    totalPages
  );

  return (
    <div className={styles.wrapper}>
      {/* Grid area is always present to avoid layout jumps */}
      <div
        className={styles.cardGrid}
        aria-live="polite"
        role="region"
      >
        {loading && (
          // simple placeholders to preserve layout while loading
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} style={{ minHeight: 120 }}>
              <div style={{
                background: "#f4f4f6",
                height: "120px",
                borderRadius: 8
              }} />
            </div>
          ))
        )}

        {!loading && employees.length === 0 && (
          <div className={styles.noData}>No employees in this department</div>
        )}

        {!loading && employees.length > 0 && (
          pageData.map((emp) => (
            <EmployeeDetailsCard
              key={emp.empId}
              titleLable="Employee Name"
              name={emp.empName}
              emp_id={`EMP ID: ${emp.empId}`}
              role={emp.designationName}
              profileIcon={profileIcon}
              leftDividerIcon={leftDividerIcon}
              rightDividerIcon={rightDividerIcon}
              phoneNumber={emp.mobileNo}
              email={emp.email}
            />
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className={styles.footer}>
        <span>
          Showing {fromEntry} to {toEntry} of {totalEntries} Entries
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className={styles.pageRange}>
            {windowStart}-{windowEnd} of {totalPages}
          </span>

          <div className={styles.pagination}>
            <button
              className={styles.prev}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </button>

            <button
              className={styles.next}
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusFlowBioDataCard;

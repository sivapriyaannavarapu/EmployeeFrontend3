import React from "react";
import styles from "./CampusFlowProfileContanier.module.css";

import CampusFlowProfileLeft from "../../components/CampusFlow/CampusFlowProfileComponent/CampusFlowProfleLeft";
import CamnpusFlowImage from "../../components/CampusFlow/CampusFlowProfileComponent/CamnpusFlowImage";

const CampusFlowProfileContainer = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className={styles.Campus_profile_container}>
      <CamnpusFlowImage profile={profile} />
      <CampusFlowProfileLeft profile={profile} />
    </div>
  );
};


export default CampusFlowProfileContainer;

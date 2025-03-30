"use client";

import React from "react";
import styles from "@/styles/GradeBadge.module.css";

interface GradeBadgeProps {
  grade: string;
}

export default function GradeBadge({ grade }: GradeBadgeProps) {
  const normalized = grade.toUpperCase();
  let bgColor = "";
  let textColor = "#fff";
  let border = "none";

  if (normalized === "VB" || normalized === "V1" || normalized === "V2") {
    bgColor = "#28a745"; // 초록색
  } else if (normalized === "V3") {
    bgColor = "#87ceeb"; // 하늘색
    textColor = "#000";
  } else if (normalized === "V4") {
    bgColor = "#000080"; // 남색
  } else if (normalized === "V5") {
    bgColor = "#800080"; // 보라색
  } else if (normalized.startsWith("V")) {
    const num = parseInt(normalized.substring(1));
    if (num >= 6 && num <= 9) {
      bgColor = "#f0f0f0"; // 연한 회색 배경
      textColor = "#000"; // 검정 텍스트
      border = "1px solid #ccc"; // 약한 회색 테두리
    } else if (num >= 10) {
      bgColor = "#000"; // 검정색
      textColor = "#fff";
    } else {
      bgColor = "#ccc";
    }
  } else {
    bgColor = "#ccc";
  }

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: border,
      }}
    >
      {grade}
    </span>
  );
}

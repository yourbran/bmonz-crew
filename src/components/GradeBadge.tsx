"use client";

import React from "react";
import styles from "@/styles/GradeBadge.module.css";

interface GradeBadgeProps {
  // 이제 grade에는 "9", "10" 같은 숫자 문자열만 넘어옵니다.
  grade: string;
}

export default function GradeBadge({ grade }: GradeBadgeProps) {
  // 숫자만 파싱
  const num = parseInt(grade, 10);
  // 화면에 붙일 실제 문자열
  const display = `V${num}`;

  let bgColor = "";
  let textColor = "#fff";
  let border = "none";

  if (num <= 2) {
    // V1, V2 그룹 (VB는 더 이상 사용하지 않으므로 1,2 이하를 초록으로 처리)
    bgColor = "#28a745";
  } else if (num === 3) {
    // V3
    bgColor = "#87ceeb";
    textColor = "#000";
  } else if (num === 4) {
    // V4
    bgColor = "#000080";
  } else if (num === 5) {
    // V5
    bgColor = "#800080";
  } else if (num >= 6 && num <= 9) {
    // V6~V9
    bgColor = "#f0f0f0";
    textColor = "#000";
    border = "1px solid #ccc";
  } else if (num >= 10) {
    // V10 이상
    bgColor = "#000";
    textColor = "#fff";
  } else {
    // 파싱 실패 등 예외
    bgColor = "#ccc";
    textColor = "#000";
  }

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border,
      }}
    >
      {display}
    </span>
  );
}

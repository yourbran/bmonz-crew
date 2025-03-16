"use client";

import { useState } from "react";
import styles from "@/styles/Polygon.module.css"; // 필요한 스타일이 있다면 별도 CSS 모듈을 작성하세요.

interface Skills {
  grip: number;
  balance: number;
  routeFinding: number;
  endurance: number;
  flexibility: number;
}

interface TooltipData {
  text: string;
  x: number;
  y: number;
}

export default function FiveSidedPolygon({ skills }: { skills: Skills }) {
  const maxRadius = 60; // 능력치 최대 길이 (10점에 해당)
  const extraMargin = 30; // 라벨과 기준 원을 위한 추가 여백
  const totalRadius = maxRadius + extraMargin + 10;
  const center = { x: totalRadius, y: totalRadius };

  // 능력치 이름 배열, 타입 명시
  const skillNames: (keyof Skills)[] = [
    "grip",
    "balance",
    "routeFinding",
    "endurance",
    "flexibility",
  ];
  const angleStep = (2 * Math.PI) / skillNames.length;

  // 능력치 값에 따라 오각형 꼭지점 좌표 계산
  const points = skillNames
    .map((skill, i) => {
      const angle = -Math.PI / 2 + i * angleStep; // 위쪽부터 시작
      const value = skills[skill]; // 0 ~ 100 (100 = 10점)
      const radius = (value / 100) * maxRadius;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  // 배경 동심원: 4개의 원 (25%, 50%, 75%, 100% 기준)
  const referenceCircles = [0.25, 0.5, 0.75, 1].map((p, i) => {
    const r = p * maxRadius;
    return (
      <circle
        key={i}
        cx={center.x}
        cy={center.y}
        r={r}
        fill="none"
        stroke="#ccc"
        strokeWidth="0.5"
      />
    );
  });

  // 각 능력치 라벨 위치 계산 (오각형 바깥쪽)
  const labels = skillNames.map((skill, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const labelRadius = maxRadius + extraMargin; // 라벨 위치
    const x = center.x + labelRadius * Math.cos(angle);
    const y = center.y + labelRadius * Math.sin(angle);
    const labelMap: Record<keyof Skills, string> = {
      grip: "그립",
      balance: "밸런스",
      routeFinding: "파인딩",
      endurance: "근지구력",
      flexibility: "유연성",
    };
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fill="#333"
      >
        {labelMap[skill]}
      </text>
    );
  });

  // 인터랙티브 기능: 각 꼭지점에 작은 투명 원을 두어 마우스 오버/클릭 시 툴팁 표시
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const vertexCircles = skillNames.map((skill, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const value = skills[skill];
    const radius = (value / 100) * maxRadius;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={5}
        fill="transparent"
        onMouseEnter={() => setTooltip({ text: `${(value / 10).toFixed(1)}점`, x, y })}
        onMouseLeave={() => setTooltip(null)}
        onClick={() => setTooltip({ text: `${(value / 10).toFixed(1)}점`, x, y })}
      />
    );
  });

  // SVG 전체 크기 설정
  const svgSize = totalRadius * 2;

  return (
    <div className={styles.polygonContainer} style={{ position: "relative", display: "inline-block" }}>
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        {referenceCircles}
        <polygon points={points} fill="rgba(0, 123, 255, 0.3)" stroke="#007bff" strokeWidth="2" />
        {labels}
        {vertexCircles}
      </svg>
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -120%)",
            background: "#333",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

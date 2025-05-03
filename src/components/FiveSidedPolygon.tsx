"use client";

import { useState, useRef } from "react";

type FiveSidedPolygonProps = {
  skills: { grip:number; balance:number; routeFinding:number; endurance:number; flexibility:number };
  styles: Record<string,string>;  // ← prop 으로 전체 모듈 받기
};

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

export default function FiveSidedPolygon({ skills, styles, }: FiveSidedPolygonProps) {
  const maxRadius = 60; // 10점 만점일 때의 최대 길이
  const extraMargin = 30; // 기준 원 및 기본 여백
  const labelExtra = 10;  // 레이블이 잘리지 않도록 추가 여백
  const totalRadius = maxRadius + extraMargin + labelExtra; // 전체 SVG에 사용할 반지름
  const center = { x: totalRadius, y: totalRadius };

  // 능력치 이름 배열 (타입 명시)
  const skillNames: (keyof Skills)[] = [
    "grip",
    "balance",
    "routeFinding",
    "endurance",
    "flexibility",
  ];
  const angleStep = (2 * Math.PI) / skillNames.length;

  // 각 능력치에 따른 오각형 꼭지점 좌표 계산 (value가 0~10 범위)
  const points = skillNames
    .map((skill, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const value = skills[skill]; // 0 ~ 10
      const radius = (value / 10) * maxRadius;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  // 배경 동심원: 4개의 원 (25%, 50%, 75%, 100% 기준)
  const referenceCircles = [0.4, 0.6, 0.8, 1].map((p, i) => {
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

  const referenceLabels = [0.4, 0.6, 0.8, 1].map((p, i) => {
    const r = p * maxRadius;
    // 정수 점수로 표시 (예: 0.4*10 = 4)
    const score = Math.round(p * 10);
    // 한 자릿수라면 dx를 -2로, 두 자릿수라면 0으로 설정 (값은 디자인에 따라 조정)
    const dx = score < 10 ? "-1" : "0";
    return (
      <text
        key={`ref-label-${i}`}
        x={center.x + r}
        y={center.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fill="#999"
        dx={dx}
      >
        {score}
      </text>
    );
  });
  

  // 라벨 위치 계산: labelRadius에 추가 여백(labelExtra) 적용
  const labelRadius = maxRadius + extraMargin - 5;
  const labels = skillNames.map((skill, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
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

  // 인터랙티브 툴팁: 각 꼭지점에 마우스 오버/클릭 시 점수 표시 (점수는 그대로 0~10)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // container와 svg에 ref를 할당합니다.
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG의 전체 크기 (viewBox 기준)
  const svgSize = totalRadius * 2;

  const handleVertexMouseEnter = (skill: keyof Skills, value: number, x: number, y: number) => {
    if (svgRef.current && containerRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      // 스케일링 비율 계산 (실제 픽셀 / viewBox 크기)
      const scale = svgRect.width / svgSize;
      const scaledX = x * scale;
      const scaledY = y * scale;
      setTooltip({ text: `${value.toFixed(1)}점`, x: scaledX, y: scaledY });
    } else {
      setTooltip({ text: `${value.toFixed(1)}점`, x, y });
    }
  };

  const handleVertexMouseLeave = () => {
    setTooltip(null);
  };

  const handleVertexClick = (skill: keyof Skills, value: number, x: number, y: number) => {
    if (svgRef.current && containerRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const scale = svgRect.width / svgSize;
      const scaledX = x * scale;
      const scaledY = y * scale;
      setTooltip({ text: `${value.toFixed(1)}점`, x: scaledX, y: scaledY });
    } else {
      setTooltip({ text: `${value.toFixed(1)}점`, x, y });
    }
  };

  const vertexCircles = skillNames.map((skill, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const value = skills[skill];
    const radius = (value / 10) * maxRadius;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={5}
        fill="rgba(0,0,0,0)" // 투명
        pointerEvents="all"
        onMouseEnter={() => handleVertexMouseEnter(skill, value, x, y)}
        onMouseLeave={() => handleVertexMouseLeave()}
        onClick={() => handleVertexClick(skill, value, x, y)}
      />
    );
  });

  return (
    <div ref={containerRef} className={styles.polygonContainer} style={{ position: "relative", display: "inline-block" }}>
      <svg ref={svgRef} width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        {referenceCircles}
        {referenceLabels}
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
            zIndex: 1000,
            opacity: 1,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

import React from 'react';

const Grafico = ({ progresso }) => {
  const raio = 45;
  const circunferencia = 2 * Math.PI * raio;
  const progressoOffset = circunferencia - (progresso / 100) * circunferencia;

  return (
    <div style={{ width: 120, height: 120 }}>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={raio}
          stroke="#e4d3c3"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={raio}
          stroke="#5e4a3f"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circunferencia}
          strokeDashoffset={progressoOffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="20"
          fill="#5e4a3f"
          fontWeight="bold"
        >
          {progresso}%
        </text>
      </svg>
    </div>
  );
};

export default Grafico;

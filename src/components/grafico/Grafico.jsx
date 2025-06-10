"use client"

import { useState, useEffect } from "react"

const Grafico = ({
  progresso = 0,
  tamanho = 100,
  espessura = 8,
  corFundo = "var(--dark)",
  corProgresso = "var(--primary)",
  corTexto = "var(--accent)",
  animado = true,
  showText = true,
  className = "",
  label = "",
}) => {
  const [valorAnimado, setValorAnimado] = useState(0)
  const radius = tamanho * 0.4
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (valorAnimado / 100) * circumference
  const viewBoxSize = tamanho

  useEffect(() => {
    if (!animado) {
      setValorAnimado(progresso)
      return
    }

    if (valorAnimado > progresso + 20) {
      setValorAnimado(0)
    }

    const timer = setTimeout(() => {
      if (valorAnimado < progresso) {
        setValorAnimado((prev) => Math.min(prev + 1, progresso))
      }
    }, 20)

    return () => clearTimeout(timer)
  }, [progresso, valorAnimado, animado])

  return (
    <div className={`grafico-container ${className}`}>
      <svg
        width={tamanho}
        height={tamanho}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="grafico-svg"
        role="img"
        aria-label={label || `${progresso}% concluído`}
      >
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          stroke={corFundo}
          strokeWidth={espessura}
          fill="none"
          opacity="0.3"
        />

        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          stroke={corProgresso}
          strokeWidth={espessura}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="grafico-progresso"
        />

        {showText && (
          <text
            x={viewBoxSize / 2}
            y={viewBoxSize / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={tamanho * 0.2}
            fill={corTexto}
            fontWeight="bold"
            className="grafico-texto"
          >
            {valorAnimado}%
          </text>
        )}
      </svg>

      {label && <div className="grafico-label text-center mt-2 text-muted-custom">{label}</div>}
    </div>
  )
}

export const GraficoGrupo = ({ dados = [] }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {dados.map((item, index) => (
        <div key={index} className="text-center">
          <Grafico
            progresso={item.valor}
            tamanho={120}
            corProgresso={item.cor || "var(--primary)"}
            label={item.label}
          />
        </div>
      ))}
    </div>
  )
}

export default Grafico

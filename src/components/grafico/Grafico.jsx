const Grafico = ({ progresso }) => {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progresso / 100) * circumference

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} stroke="#5D4B40" strokeWidth="8" fill="none" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#cfb79d" 
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: "stroke-dashoffset 0.3s" }}
      />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fill="#4b3a3a">
        {progresso}%
      </text>
    </svg>
  )
}

export default Grafico

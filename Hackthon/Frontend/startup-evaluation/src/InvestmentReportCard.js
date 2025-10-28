import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import investmentData from './data';
import './InvestmentReportCard.css'; // Import external CSS

const colors = {
  primary: '#2E86AB',
  secondary: '#A23B72',
  accent: '#F18F01',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  light: '#F8F9FA',
  dark: '#343A40',
  gray: '#6C757D'
};

// Circular Progress Component
const CircularProgress = ({ value, maxValue, label, color, size = 140 }) => {
  const percentage = (value / maxValue) * 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div className="circular-container">
      <div className="circular-wrapper" style={{ width: size, height: size }}>
        <svg className="circular-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
        <div className="circular-text">
          <div className="circular-value" style={{ color, fontSize: size / 7 }}>
            {value}{maxValue === 100 ? '%' : '/10'}
          </div>
          <div className="circular-label" style={{ fontSize: size / 12 }}>{label}</div>
        </div>
      </div>
    </div>
  );
};

const InvestmentReportCard = () => {
  const { investment_memo } = investmentData;

  const financialPieData = [
    { name: 'Monthly Revenue', value: 85, color: colors.primary },
    { name: 'Growth Rate', value: 11.7, color: colors.accent },
    { name: 'Runway (months)', value: 21.4, color: colors.secondary },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-box">
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="report-container">
      <div className="header">
        <h1 className="title">Investment Memo Report Card</h1>
        <p className="subtitle">Comprehensive Analysis of Investment Opportunity</p>
        <div>
          <div className={`rating-badge ${investment_memo.executive_summary.investment_rating}`}>
            {investment_memo.executive_summary.investment_rating}
          </div>
          <div className="confidence-score">
            Confidence: {investment_memo.executive_summary.confidence_score}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="section">
        <h2 className="section-title">Executive Summary</h2>
        <p>{investment_memo.executive_summary.company_brief}</p>
        <div className="two-column">
          <div>
            <h3 className="highlight-title">Highlights</h3>
            <ul>
              {investment_memo.executive_summary.top_3_highlights.map((h, i) => (
                <li key={i} className="highlight-item">{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="risk-title">Risks</h3>
            <ul>
              {investment_memo.executive_summary.top_3_risks.map((r, i) => (
                <li key={i} className="risk-item">{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Financial Highlights */}
      <div className="section">
        <h2 className="section-title">Financial Highlights</h2>
        <div className="enhanced-score">
          <CircularProgress value={9.1} maxValue={10} label="Financial Score" color={colors.success} size={140} />
          <div className="score-content">
            <div className="verdict">{investment_memo.financial_highlights.verdict}</div>
            <p>{investment_memo.financial_highlights.main_strength}</p>
          </div>
        </div>

        <div className="metric-grid">
          {Object.entries(investment_memo.financial_highlights.key_metrics).map(([label, val]) => (
            <div key={label} className="metric-card">
              <div className="metric-value">{val}</div>
              <div className="metric-label">{label.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={financialPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {financialPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Assessment */}
      <div className="section">
        <h2 className="section-title">Team Assessment</h2>
        <div className="enhanced-score">
          <CircularProgress value={5.9} maxValue={10} label="Team Score" color={colors.warning} size={140} />
          <div className="score-content">
            <p>{investment_memo.team_highlights.overall_assessment}</p>
          </div>
        </div>

        <div className="two-column">
          <div>
            <h3 className="highlight-title">Strengths</h3>
            <ul>
              {investment_memo.team_highlights.key_strengths.map((s, i) => (
                <li key={i} className="highlight-item">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="risk-title">Critical Gaps</h3>
            <ul>
              {investment_memo.team_highlights.critical_gaps.map((g, i) => (
                <li key={i} className="risk-item">{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="section">
        <h2 className="section-title">Market Analysis</h2>
        <div className="enhanced-score">
          <CircularProgress value={40} maxValue={100} label="Validation Confidence" color={colors.danger} size={140} />
          <div className="score-content">
            <p><strong>Market Size:</strong> {investment_memo.market_highlights.market_size}</p>
            <p><strong>Growth Potential:</strong> {investment_memo.market_highlights.growth_potential}</p>
            <p><strong>Competitive Landscape:</strong> {investment_memo.market_highlights.competitive_landscape}</p>
          </div>
        </div>
        <p><strong>Main Opportunity:</strong> {investment_memo.market_highlights.main_opportunity}</p>
      </div>

      {/* Investment Recommendation */}
      <div className="section">
        <h2 className="section-title">Investment Recommendation</h2>
        <div className={`recommendation-card ${investment_memo.investment_recommendation.decision}`}>
          <h3>Decision: {investment_memo.investment_recommendation.decision}</h3>
          <p>{investment_memo.investment_recommendation.reason}</p>
        </div>

        <h3>Next Steps</h3>
        <ul className="next-steps-list">
          {investment_memo.investment_recommendation.next_steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvestmentReportCard;

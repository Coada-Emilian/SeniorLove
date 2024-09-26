interface CalendarIconProps {
  extractedDate: { day: number; month: string };
  page?: string;
}

export default function CalendarIcon({
  extractedDate,
  page,
}: CalendarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...(page === 'profile'
        ? { width: '50', height: '50' }
        : { width: '100', height: '100' })}
      viewBox="0 0 100 100"
    >
      {/* Calendar body */}
      <rect
        x="10"
        y="20"
        width="80"
        height="70"
        rx="10"
        ry="10"
        fill="#ececec"
        stroke="#ccc"
        strokeWidth="2"
      />

      {/* Calendar header */}
      <rect x="10" y="20" width="80" rx="5" ry="5" height="20" fill="#D85071" />

      {/* Month text */}
      <text
        x="50"
        y="35"
        fontFamily="Arial"
        fontSize="10"
        fill="white"
        textAnchor="middle"
      >
        {extractedDate.month}
      </text>

      {/* Day text */}
      <text
        x="50"
        y="70"
        fontFamily="Arial"
        fontSize="30"
        fill="#333"
        textAnchor="middle"
      >
        {extractedDate.day}
      </text>
    </svg>
  );
}

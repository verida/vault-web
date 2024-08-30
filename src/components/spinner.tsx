type SpinnerProps = {
  width?: number
  height?: number
}

export const Spinner: React.FC<SpinnerProps> = ({
  width = 80,
  height = 80,
}) => {
  return (
    <>
      <div
        className="h-20 w-20 animate-spin rounded-full bg-gradient-conic"
        style={{
          width,
          height,
          mask: "url(#mask) no-repeat center",
          WebkitMask: "url(#mask) no-repeat center",
          WebkitMaskSize: "100%",
          maskSize: "100%",
        }}
      ></div>
      <svg width="0" height="0">
        <defs>
          <mask id="mask" x="0" y="0" width="1" height="1">
            <rect x="0" y="0" width="80" height="80" fill="white" />
            <circle cx="40" cy="40" r="30" fill="black" />
          </mask>
        </defs>
      </svg>
    </>
  )
}

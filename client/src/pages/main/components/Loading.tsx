import { useEffect, useState } from "react"

const TEXTS = [
  "가장 알맞은 장소를 찾고 있어요.",
  "조금만 기다려주세요.",
  "거의 다 찾았어요.",
  "조금만 더 기다려주세요.",
]

type SpinnerProps = {
  size?: number;
  color?: string;
  className?: string;
};

const Spinner = ({
  size = 24,
  color = 'text-blue-500',
  className = '',
}: SpinnerProps) => {
  return (
    <div className={`inline-block ${className}`}>
      <svg
        className={`animate-spin ${color}`}
        style={{ width: size, height: size }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
        />
      </svg>
    </div>
  );
};

const Loading = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdx((prev) => {
        if (prev === TEXTS.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])


  return (
    <section className="bg-white rounded-lg px-4 py-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner />
        {TEXTS[idx]}
      </div>
    </section>
  )
}

export default Loading
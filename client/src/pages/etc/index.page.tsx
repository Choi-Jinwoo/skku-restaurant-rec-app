import { useEffect, useState } from "react"
import InputText from "../../shared/components/InputText"
import Layout from "../../shared/components/Layout"
import TopNavBar from "../../shared/components/TopNavBar"
import { getMBTIScore } from "../../remote"

const isValidMbti = (mbti: string) => {
  const mbtiRegex = /^(?:[IE][NS][FT][JP]|[IE][NS][FT]X)$/;
  return mbtiRegex.test(mbti);
}


const getScoreLabel = (score: number) => {
  if (score >= 90) return { label: "천생연분!", color: "bg-pink-500", emoji: "💘" };
  if (score >= 75) return { label: "시너지 최고!", color: "bg-blue-500", emoji: "🔥" };
  if (score >= 50) return { label: "괜찮은 조합이에요", color: "bg-green-500", emoji: "😊" };
  if (score >= 25) return { label: "서로 노력해봐요", color: "bg-yellow-500", emoji: "🤔" };
  return { label: "이 조합은 조금 힘들어요", color: "bg-red-500", emoji: "💥" };
};

const SynergyResult = ({ result }: { result: number | null }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    if (result !== null) {
      const timeout = setTimeout(() => {
        setAnimatedWidth(result);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [result]);

  const scoreMeta = result !== null ? getScoreLabel(result) : null;

  return (
    <section className="bg-white rounded-xl p-6 w-full">
      {result !== null ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-8">우리팀 회식 시너지 결과는...</h2>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-3xl font-bold text-gray-900">{result}점</span>
            <span className="text-xl">{scoreMeta?.emoji}</span>
          </div>
          <p className={`text-sm font-medium ${scoreMeta?.color} text-white inline-block px-3 py-1 rounded-full mb-4`}>
            {scoreMeta?.label}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ease-out ${scoreMeta?.color}`}
              style={{ width: `${animatedWidth}%` }}
            ></div>
          </div>
        </>
      ) : (
        <p className="text-gray-700 text-sm mb-8">결과 보기 버튼을 클릭해서 결과를 확인해보세요</p>
      )}
    </section>
  );
}


const EtcPage = () => {
  const [mbtis, setMbtis] = useState<(string | null)[]>([null]);
  const [result, setResult] = useState<number | null>(null);

  const onResultClick = async () => {
    const filledMbtis = mbtis.filter(mbti => mbti !== null);

    if (filledMbtis.length < 2) {
      alert("최소 2명 이상의 MBTI를 입력해주세요.");
      return;
    }

    if (filledMbtis.some(item => !isValidMbti(item ?? ''))) {
      alert("올바른 MBTI 형식이 아닙니다.");
      return;
    }

    const { data } = await getMBTIScore({ mbtis: filledMbtis })

    setResult(data.score)
  }

  return (
    <>
      <TopNavBar />
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-700 text-xl font-bold">우리팀 회식 시너지는?</h1>
        </div>

        <div className="flex gap-4">
          <section className="bg-white rounded-lg p-4 w-full">
            <p className="text-gray-700 text-sm mb-8">회식 인원의 MBTI를 기반으로 시너지 점수를 알려드려요!</p>
            <div className="flex flex-col gap-4">
              {
                mbtis.map((mbti, idx) => (
                  <InputText
                    label={`${idx + 1}번째 인원 MBTI`}
                    key={idx}
                    value={mbti ?? ''}
                    onChange={(value) => {
                      const newMbtis = [...mbtis];
                      newMbtis[mbtis.indexOf(mbti)] = value
                      setMbtis(newMbtis);
                    }}
                    placeholder="MBTI를 입력하세요"
                  />
                ))
              }
            </div>
            <div className="flex gap-4 mt-4">
              <button className="mt-4 bg-gray-100 text-gray-500 border-1 border-gray-400 rounded-lg px-4 py-2 cursor-pointer" onClick={() => setMbtis(prev => [...prev, null])}>
                인원 추가
              </button>
              <button className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer" onClick={onResultClick}>
                결과 보기
              </button>
            </div>
          </section>
          <SynergyResult result={result} />
        </div>
      </Layout>
    </>
  )
}

export default EtcPage
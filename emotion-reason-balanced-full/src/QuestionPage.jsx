// 감정-이성 균형 테스트 전체 코드 (공유 기능 제거됨)

import React, { useState, useEffect } from 'react';

const questions = [
  { id: 1, text: "나는 타인의 기분 변화를 빠르게 알아차리는 편이다.", type: "emotion" },
  { id: 2, text: "나는 감정보다 사실을 우선시한다.", type: "reason" },
  { id: 3, text: "감정이 상하면 일의 효율이 떨어진다.", type: "emotion" },
  { id: 4, text: "누군가와 다툴 때 감정보다 논리를 먼저 점검한다.", type: "reason" },
  { id: 5, text: "슬픈 영화나 책을 보면 눈물이 쉽게 난다.", type: "emotion" },
  { id: 6, text: "실수를 했을 때 감정적 반응보다 원인 분석이 먼저다.", type: "reason" },
  { id: 7, text: "상대방이 힘들어 보이면 이유를 묻기 전에 감정이 먼저 흔들린다.", type: "emotion" },
  { id: 8, text: "감정이 복잡할수록 판단은 이성적으로 하려 노력한다.", type: "reason" },
  { id: 9, text: "나는 다른 사람의 입장을 먼저 생각하려 한다.", type: "emotion" },
  { id: 10, text: "나는 대부분의 결정을 논리적으로 내린다고 생각한다.", type: "reason" },
  { id: 11, text: "감정을 표현하지 않으면 오히려 더 불편하다.", type: "emotion" },
  { id: 12, text: "감정보다 논리의 정확성이 더 중요하다.", type: "reason" },
  { id: 13, text: "친구가 힘들다고 말하면, 조언보다 공감을 먼저 해준다.", type: "emotion" },
  { id: 14, text: "대화 중 감정보다는 말의 구조와 논리성에 집중한다.", type: "reason" },
  { id: 15, text: "감정이입이 강해 가끔 타인의 이야기가 내 일처럼 느껴진다.", type: "emotion" },
  { id: 16, text: "상황을 설명할 때 감정적 언급보다 사실 중심으로 말한다.", type: "reason" },
  { id: 17, text: "상대의 말보다 말투나 눈빛에서 더 많은 것을 느낀다.", type: "emotion" },
  { id: 18, text: "위기 상황에서도 감정에 휘둘리지 않고 침착하려 한다.", type: "reason" },
  { id: 19, text: "갈등 상황에서는 감정이 먼저 격해지는 편이다.", type: "emotion" },
  { id: 20, text: "나는 문제를 해결할 때 감정은 최대한 배제하려 한다.", type: "reason" }
];

const nextSteps = {
  '공감의 거울 (감정우세형)': '감정은 당신의 언어입니다. 그러나 그 언어가 길을 잃지 않도록, 당신만의 기준을 세워보세요.',
  '논리의 조율자 (이성우세형)': '이성은 분명한 빛입니다. 그러나 감정이라는 그늘이 없다면 세상은 입체감을 잃습니다. 균형을 위해 감정의 숨결을 들어보세요.',
  '조화의 탐구자 (균형형)': '균형은 멈춤이 아닌 지속적인 조율입니다. 지금의 조화를 믿되, 계속해서 자신을 살펴보세요.',
  '내면의 전장 (충돌형)': '당신은 격류 속에 있습니다. 감정과 이성 어느 한 편도 포기하지 않기에 괴로운 당신은, 진실에 가장 가까운 위치에 있을 수 있습니다.'
};

const recommendedContents = {
  '공감의 거울 (감정우세형)': [
    '📖 『미움받을 용기』 – 감정의 뿌리를 찾는 철학적 여정',
    '🎬 「인사이드 아웃」 – 감정의 다양성과 조화',
    '🎧 이소라 - 「바람이 분다」 – 감정에 깊이 잠기는 음악',
    '✍️ 감정 일기 쓰기 (3일간 자신의 감정 기록)',
    '🌸 감정 공유 챌린지: 하루에 한 번, 누군가에게 진심을 말하기',
    '🎨 컬러테라피 그림 그리기 앱 추천: Lake (감정 표현용)'
  ],
  '논리의 조율자 (이성우세형)': [
    '📖 『논리의 기술』 – 논증과 오류에 대한 체계적 이해',
    '🎧 팟캐스트 「김지수의 인터스텔라」 – 깊이 있는 대화',
    '💡 하루 1감정 메모: 오늘 느낀 감정을 단어로 적기',
    '🎬 「그녀(Her)」 – 감성과 이성이 충돌하는 미래',
    '🧩 철학 유튜브: 채사장의 지대넓얕 - "감정이란 무엇인가?"',
    '✍️ 감정에 대해 논리적으로 정의해보기'
  ],
  '조화의 탐구자 (균형형)': [
    '📖 『어떻게 살 것인가』 – 통합적 삶의 모색',
    '🎬 「월터의 상상은 현실이 된다」 – 내면의 흐름과 용기',
    '🌀 명상 앱 체험 (Calm, Insight Timer 등)',
    '🗒️ 나만의 조화 공책 만들기: 매일 1감정 + 1논리 적기',
    '🎧 IU - 「Love poem」 – 감성과 이성이 공존하는 곡',
    '📷 오늘 하루를 대표하는 장면을 사진으로 기록하기'
  ],
  '내면의 전장 (충돌형)': [
    '📖 『고통에 관하여』 – 내면의 상처와 통찰',
    '🎧 이진아 - 「시간아 천천히」 – 혼란 속의 따뜻한 위로',
    '✍️ “감정 vs 이성” 자기 내면 토론 일기',
    '🎬 「블루 발렌타인」 – 감정의 파열과 선택의 이성',
    '🌫️ 그림자 글쓰기: 숨기고 싶은 감정 3가지를 글로 적기',
    '🔄 혼란 다이어그램 만들기: 지금 내 안의 감정/이성 지도 그리기'
  ]
};

const reinforceLabels = {
  '공감의 거울 (감정우세형)': '이성을 더 키우기',
  '논리의 조율자 (이성우세형)': '감정을 더 키우기',
  '조화의 탐구자 (균형형)': '균형 유지하기',
  '내면의 전장 (충돌형)': '내면 통합하기'
};

const ogImageMap = {
  '공감의 거울 (감정우세형)': '/og_emotion.png',
  '논리의 조율자 (이성우세형)': '/og_reason.png',
  '조화의 탐구자 (균형형)': '/og_balanced.png',
  '내면의 전장 (충돌형)': '/og_conflict.png'
};

const QuestionPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result) {
      const og = document.querySelector('meta[property="og:image"]');
      if (og && ogImageMap[result.resultType]) {
        og.setAttribute('content', ogImageMap[result.resultType]);
      }
    }
  }, [result]);

  const handleSelect = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = score;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateResult = () => {
    let emotionScore = 0;
    let reasonScore = 0;

    answers.forEach((score, index) => {
      const type = questions[index].type;
      if (type === 'emotion') emotionScore += score;
      else if (type === 'reason') reasonScore += score;
    });

    const difference = emotionScore - reasonScore;
    let resultType = '';

    if (emotionScore >= 40 && reasonScore >= 40) resultType = '내면의 전장 (충돌형)';
    else if (Math.abs(difference) <= 5) resultType = '조화의 탐구자 (균형형)';
    else if (emotionScore > reasonScore) resultType = '공감의 거울 (감정우세형)';
    else resultType = '논리의 조율자 (이성우세형)';

    setResult({ emotionScore, reasonScore, resultType });
  };

  if (result) {
    const contents = recommendedContents[result.resultType];
    const label = reinforceLabels[result.resultType];

    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">당신의 결과는...</h2>
        <p className="text-xl mb-2">{result.resultType}</p>
        <p className="text-sm text-gray-500 mb-2">(감정 점수: {result.emotionScore}, 이성 점수: {result.reasonScore})</p>

        <img
          src={ogImageMap[result.resultType]}
          alt="결과 유형 이미지"
          className="mx-auto my-4 rounded-xl shadow max-w-full"
        />

        <p className="text-base italic text-gray-700 mb-6">{nextSteps[result.resultType]}</p>

        {contents && (
          <div className="bg-gray-50 rounded-xl p-4 shadow-inner mb-6 text-left">
            <h3 className="text-lg font-semibold mb-2 text-center">🎯 당신을 위한 추천 콘텐츠</h3>
            <ul className="list-disc list-inside space-y-1">
              {contents.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {label && (
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
                  {label} 위한 콘텐츠 보기
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setAnswers(Array(questions.length).fill(0));
              setResult(null);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            다시 테스트하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      {currentIndex === 0 && (
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">감정과 이성의 균형을 찾아서</h1>
          <p className="text-gray-600 text-base">당신의 내면은 어디쯤에 머무르고 있나요?</p>
        </div>
      )}

      <h2 className="text-lg text-gray-600 mb-2">문항 {currentIndex + 1} / {questions.length}</h2>
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <p className="text-xl font-medium mb-4">{questions[currentIndex].text}</p>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleSelect(score)}
              className={`px-4 py-2 rounded-full border ${answers[currentIndex] === score ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={prevQuestion} className="px-4 py-2 bg-gray-200 rounded">이전</button>
        <button onClick={nextQuestion} className="px-4 py-2 bg-blue-500 text-white rounded">{currentIndex === questions.length - 1 ? '결과 보기' : '다음'}</button>
      </div>
    </div>
  );
};

export default QuestionPage;

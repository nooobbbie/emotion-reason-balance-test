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

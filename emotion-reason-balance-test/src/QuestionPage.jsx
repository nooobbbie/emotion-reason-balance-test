import React, { useState } from 'react';

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

const QuestionPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [result, setResult] = useState(null);

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

    if (emotionScore >= 60 && reasonScore >= 60) resultType = '내면의 전장 (충돌형)';
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
        <p className="text-sm text-gray-500">(감정 점수: {result.emotionScore}, 이성 점수: {result.reasonScore})</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-lg text-gray-600 mb-2">문항 {currentIndex + 1} / {questions.length}</h2>
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <p className="text-xl font-medium mb-4">{questions[currentIndex].text}</p>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleSelect(score)}
              className={\`px-4 py-2 rounded-full border \${answers[currentIndex] === score ? 'bg-blue-500 text-white' : 'bg-gray-100'}\`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={prevQuestion} className="px-4 py-2 bg-gray-200 rounded">이전</button>
        <button onClick={nextQuestion} className="px-4 py-2 bg-blue-500 text-white rounded">
          {currentIndex === questions.length - 1 ? '결과 보기' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;

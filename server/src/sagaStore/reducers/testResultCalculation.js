const calcPercents = (value, all) => Math.round((value / all) * 100);

const createResultObj = () => ({
  correct_answers_amount: 0,
  wrong_answers_amount: 0,
  missed_answers_amount: 0,
  allAnswers: 0,
});

const changeAmountToPercentage = word => (word === 'amount' ? 'percentage' : word);

const firstCharToUpper = word => {
  const firstChar = word.slice(0, 1).toUpperCase();
  const leftoverPart = word.slice(1);
  return `${firstChar}${leftoverPart}`;
};

const makeCamelCaseKey = phrase =>
  phrase
    .split('_')
    .map(word => {
      const wordToChange = changeAmountToPercentage(word);
      return firstCharToUpper(wordToChange);
    })
    .join('');

const filterAnswers = (test, answerToFilter) => {
  return test.answers
    .filter(answer => answer[answerToFilter])
    .map(answer => answer.text)
    .join(', ');
};

const createGivenAnswerToPush = test => ({
  questionNumber: test.id,
  givenAnswer: test.givenAnswer || filterAnswers(test, 'checked'),
  correctAnswer: filterAnswers(test, 'correct'),
  isCorrect: test.valid,
});

const calcFinalResult = result => {
  const keys = Object.keys(result);
  return keys.reduce((acc, key) => {
    const value = result[key];
    if (key === 'all') {
      Object.keys(value).forEach(answerKey => {
        acc[answerKey] = value[answerKey];
      });
    } else {
      Object.keys(value).forEach(answerKey => {
        if (answerKey !== 'allAnswers') {
          const camelCaseKey = makeCamelCaseKey(answerKey);
          const finalKey = `${key}${camelCaseKey}`;
          acc[finalKey] = calcPercents(value[answerKey], value.allAnswers);
        }
      });
    }
    return acc;
  }, {});
};

export default tests => {
  const results = {
    all: {
      correctAnswersAmount: 0,
      wrongAnswersAmount: 0,
      missedAnswersAmount: 0,
    },
    cmn: createResultObj(),
    als: createResultObj(),
    ccn: createResultObj(),
    ctn: createResultObj(),
    rgy: createResultObj(),
    lgc: createResultObj(),
    spl: createResultObj(),
  };
  const givenAnswers = [];
  let levelGeneral;
  tests.forEach(test => {
    const { answers, knowledgeType } = test;
    if (test.valid) {
      results.all.correctAnswersAmount += 1;
      results[knowledgeType].correct_answers_amount += 1;
    } else if (answers.some(answer => answer.checked)) {
      results.all.wrongAnswersAmount += 1;
      results[knowledgeType].wrong_answers_amount += 1;
    } else {
      results.all.missedAnswersAmount += 1;
      results[knowledgeType].missed_answers_amount += 1;
    }
    results[knowledgeType].allAnswers += 1;
    givenAnswers.push(createGivenAnswerToPush(test));
  });
  const allCorrectAnswers = results.all.correctAnswersAmount;
  switch (true) {
    case allCorrectAnswers <= 13: {
      levelGeneral = 'low';
      break;
    }
    case allCorrectAnswers <= 18: {
      levelGeneral = 'belowAverage';
      break;
    }
    case allCorrectAnswers <= 24: {
      levelGeneral = 'average';
      break;
    }
    case allCorrectAnswers <= 29: {
      levelGeneral = 'aboveAverage';
      break;
    }
    case allCorrectAnswers >= 30: {
      levelGeneral = 'high';
      break;
    }
  }
  const finalResult = calcFinalResult(results);
  return {
    levelGeneral,
    answers: givenAnswers,
    ...finalResult,
  };
};

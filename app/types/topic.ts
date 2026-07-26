export type Example = {
  english: string;
  spanish: string;
  explanation: string;
};

export type Use = {
  title: string;
  explanation: string;
  example: {
    english: string;
    spanish: string;
  };
};

export type Structure = {
  formula: string;
  explanation: string;
};

export type Affirmative = {
  structure: string;
  rules: string[];
  examples: Example[];
};

export type Negative = {
  structure: string;
  rules: string[];
  examples: Example[];
};

export type Interrogative = {
  structure: string;
  yesNoQuestions: Example[];
  whQuestions: Example[];
};

export type Keyword = {
  english: string;
  spanish: string;
  explanation: string;
};

export type Analogy = {
  title: string;
  explanation: string;
  keyIdea: string;
};

export type ComparisonExample = {
  first: {
    english: string;
    spanish: string;
  };
  second: {
    english: string;
    spanish: string;
  };
};

export type Comparison = {
  topic: string;
  similarity: string;
  mainDifference: string;
  howToIdentify: string;
  examples: ComparisonExample[];
};

export type CommonMistake = {
  incorrect: string;
  correct: string;
  explanation: string;
};

export type Summary = {
  whenToUse: string;
  affirmative: string;
  negative: string;
  interrogative: string;
  keyDifference: string;
};


export type GrammarTopicResponse = {
  topic: string;

  title: string;

  introduction: {
    whatIsIt: string;
    mainUse: string;
    simpleExplanation: string;
  };

  uses: Use[];

  structure: {
    affirmative: Structure;
    negative: Structure;
    interrogative: Structure;
  };

  affirmative: Affirmative;

  negative: Negative;

  interrogative: Interrogative;

  keywords: Keyword[];

  examples: {
    affirmative: Example[];
    negative: Example[];
    interrogative: Example[];
  };

  analogy: Analogy;

  comparisons: Comparison[];

  keyDifferences: string[];

  commonMistakes: CommonMistake[];

  tips: string[];

  summary: Summary;
};
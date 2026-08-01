export type TPropQuestions = {
  text: string;
  questions: string[];
  showQuestion: boolean;
  onChange: (value: boolean) => void;

}


type TQuestion = {
  questions: string;
  responses: string;
}

export type TReqQuestion = {

  text: string;
  request: TQuestion[];

}


export type TResQuestion = {
  questions: string;
  responses: string;
  correction: string;
  suggestion: string;
  state: boolean;
  level: 'good' | 'partial' | 'bad'
}
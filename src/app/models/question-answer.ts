/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Interface QuestionAnswer model
 */
export interface IQuestionAnswer {
    id: Number;
    question: string;
    options: Array<{ id: Number, name: string, selected: boolean }>;
    answer: string;
}
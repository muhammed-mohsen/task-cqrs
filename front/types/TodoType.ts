export type TodoType = {
  id: string;
  text: string;
  status: TodoStatusEnum;
};
export enum TodoStatusEnum {
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

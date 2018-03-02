export interface ITodo {
	id ?: string;
	whatTodo : string;
	detail ?: string;
	createdAt ?: any;
	status : TStatus;
	deadLine ?: any;
}

export enum TStatus {
	Created = 0,
	Completed,
	Failed,
	Expired
}


//自定义返回类型
export interface ResponseValue<T> {
	flag?: boolean;
	status?: number;
	message?: string;
	data?: T;
}

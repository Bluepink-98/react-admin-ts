/* 
用来保存一些数据的工具模块
*/

interface IUser {
    user?: {
        id?: string;
        password?: string;
        username?: string;
    };
}
const user: IUser = {
    user: { id: '', username: '' },
};

export default user;

import { UserModel } from '../../modules/UserModel';

var store = require('store');
const USER_KEY = 'user_key';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveUser(user: UserModel) {
    store.set(USER_KEY, user);
  },
  getUser(): UserModel {
    return store.get(USER_KEY || {});
  },
  removeUser() {
    store.remove(USER_KEY);
  },
};

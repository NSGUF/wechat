import Httpjs from '../utils/httpjs';

export default class Register extends Httpjs {

  doLogin(data: any) {
    return this.request({url: '/login', method: 'post', data: data});
  }
  keepStatus(data: any) {
    return this.request({url: '/status', method: 'post', data: data});
  }

  doRegiest(data: any) {
    return this.request({url: '/register', method: 'post', data: data});
  }

}

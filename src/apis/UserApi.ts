import Httpjs from '../utils/httpjs';

export default class UserApi extends Httpjs {

    getUserInfo() {
        return this.request({url: '/user'});
    }

    getFriends() {
        return this.request({url: '/friends'});
    }

    searchFriend(data: any) {
        return this.request({url: '/search/friend', method: 'post', data});
    }

    getMessages(fromUserId: string, toUserId: string) {
        return this.request({
            url: '/get/messages',
            data: {
                fromUserId,
                toUserId,
            }
        });
    }

}

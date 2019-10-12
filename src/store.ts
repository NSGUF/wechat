import Vue from 'vue';
import {GetterTree} from 'vuex';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
    login: Boolean,
    friends: any[],
    unReadMessageCount: number,
    user: any,
}


const state: State = {
    login: false,
    friends: [],
    unReadMessageCount: 0,
    user: {},
};

const getters: GetterTree<any, any> = {
    getUnReadMessageCount(state): number {
        const {unReadMessageCount} = state;
        return unReadMessageCount;
    },
    getFriends(state): any[] {
        const {friends} = state;
        return friends;
    },
    getUser(state): any {
        const { user } = state
        return user
    }
};
export default new Vuex.Store({
    state,
    mutations: {
        setUnreadNumber(state, unReadMessageCount) {
            state.unReadMessageCount = unReadMessageCount;
        },
        setFriends(state, friends: any[]) {
            state.friends = friends;
        },
        setUser(state, user: any) {
            state.user = user
        }
    },
    getters,
    actions: {},
});

import { defineStore } from 'pinia';
import { ref } from 'vue';
import User from '@/model/user';
import marathon from '@/utils/client/marathon';

const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>();

  function setCurrentUser(payload: User | null) {
    currentUser.value = payload;
  }

  async function getCurrentUser(): Promise<User> {
    if (currentUser.value) {
      return currentUser.value;
    }

    const user = await marathon.getUser();

    setCurrentUser(user);

    return user;
  }

  return { currentUser, setCurrentUser, getCurrentUser };
});

export default useAuthStore;

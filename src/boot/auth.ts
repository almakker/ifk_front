import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';
import { api } from './axios';

export default boot(() => {
    const authStore = useAuthStore();

    if (authStore.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
    }
}); 
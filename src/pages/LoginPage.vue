<template>
    <q-page class="flex flex-center">
        <q-card class="login-card">
            <q-card-section>
                <div class="text-h6">Login</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md">
                    <q-input v-model="email" type="email" label="Email" :disable="loading"
                        :rules="[val => !!val || 'Email is required']" />

                    <q-input v-model="password" type="password" label="Password" :disable="loading"
                        :rules="[val => !!val || 'Password is required']" />

                    <div class="q-mt-md">
                        <q-btn label="Login" type="submit" color="primary" class="full-width" :loading="loading" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const loading = ref(false)


const onSubmit = async () => {
    if (loading.value) return

    loading.value = true
    try {
        const response = await authStore.login(email.value, password.value)
        console.log('Login successful:', response)

        if (!authStore.token) {
            throw new Error('Token not set after login')
        }

        $q.notify({
            type: 'positive',
            message: 'Login successful!'
        })

        await router.replace('/')

    } catch (error) {
        console.error('Login error:', error)

        let errorMessage = 'Login failed. Please check your credentials.'

        if (error instanceof Error) {
            errorMessage = error.message
        }
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            errorMessage = error.response.data.message
        }

        $q.notify({
            type: 'negative',
            message: errorMessage,
            timeout: 3000
        })
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
}
</style>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="isAuthenticated" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn v-if="isAuthenticated" flat dense round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="isAuthenticated" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.token);

const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: 'Hotel History',
    icon: 'home',
    link: '/'
  },
  // {
  //   title: 'History',
  //   caption: 'View history',
  //   icon: 'history',
  //   link: '/history'
  // }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function logout() {
  try {
    await authStore.logout();
    await router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>

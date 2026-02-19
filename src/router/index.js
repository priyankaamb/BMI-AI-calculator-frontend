import { createRouter, createWebHistory } from 'vue-router';
import mainRoutes from './mainRoutes';
import aiRoutes from './aiRoutes';
import bmiRoutes from './bmiRoutes';
import notFoundRoutes from './notFoundRoutes'; // ✅ Import 404 Routes

const routes = [...mainRoutes, ...aiRoutes, ...bmiRoutes, ...notFoundRoutes]; // ✅ Merge all routes

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

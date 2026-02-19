import NotFound from '@/views/NotFound.vue';

const notFoundRoutes = [
  { path: '/:pathMatch(.*)*', component: NotFound }, // ✅ Catch-all 404 route
];

export default notFoundRoutes;

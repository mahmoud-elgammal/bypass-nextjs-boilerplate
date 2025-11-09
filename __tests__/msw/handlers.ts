import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/site', () => {
    return HttpResponse.json({ name: 'next-edge', description: 'Mocked', templates: [] });
  }),
];


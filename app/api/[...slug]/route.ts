import { apiError } from '@/lib/api';

export function GET() {
  return apiError(404, 'not_found', 'Unknown API path. See /openapi.json for the endpoints that exist.');
}

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- Runtime injection for Gemini API key (optional; for quick setup) --}}
    @if(env('VITE_GEMINI_API_KEY'))
      <meta name="gemini-api-key" content="{{ env('VITE_GEMINI_API_KEY') }}">
      <script>
        window.__GEMINI_API_KEY = "{{ env('VITE_GEMINI_API_KEY') }}";
      </script>
    @endif
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
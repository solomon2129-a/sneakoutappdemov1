// This route is currently not implemented as the app uses custom authentication
// TODO: Implement Auth0 integration if needed

export async function GET() {
  return new Response(JSON.stringify({ error: "Not implemented" }), {
    status: 501,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ error: "Not implemented" }), {
    status: 501,
    headers: { "Content-Type": "application/json" },
  });
}

import { NextRequest } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { items, newItem } = body;

  return Response.json({ items: [...items, newItem] });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const items = params.get("items");

  console.log(items);
  const parsedItems = items ? items.split("$") : [];

  return Response.json({ items: parsedItems });
}

import { NextResponse } from "next/server";

export async function GET() {
  // Mock data — integrate with OpenRouter usage API later
  const revenue = {
    month: "2026-02",
    apiCalls: 1234,
    costUSD: 12.34,
    revenueUSD: 0, // not monetized yet
    net: -12.34,
    topModels: [
      { model: "openrouter/stepfun/step-3.5-flash:free", calls: 800, cost: 0 },
      { model: "deepseek-free", calls: 300, cost: 0 },
    ],
  };
  return NextResponse.json(revenue);
}

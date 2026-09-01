import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.api_logs.findMany({
      include: {
        user: true, // relation
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //  total stats
    const total = logs.length;
    const success = logs.filter((l) => l.status < 400).length;
    const errors = logs.filter((l) => l.status >= 400).length;
    const avgLatency =
      logs.length > 0
        ? Math.round(
            logs.reduce((acc, l) => acc + l.latency, 0) / logs.length
          ) + "ms"
        : "0ms";

    //  group by user
    const userMap: any = {};

    logs.forEach((log) => {
      const userId = log.userId;

      if (!userMap[userId]) {
        userMap[userId] = {
          id: userId,
          name: log.user?.firstName + " " + log.user?.lastName,
             organizationName: log.user?.organizationName || "Unknown", 
          requests: 0,
          success: 0,
          errors: 0,
          latency: 0,
          lastActive: log.createdAt,
          logs: [],
        };
      }

      userMap[userId].requests++;
      userMap[userId].latency += log.latency;

      if (log.status < 400) {
        userMap[userId].success++;
      } else {
        userMap[userId].errors++;
      }

      userMap[userId].logs.push(log);

      if (log.createdAt > userMap[userId].lastActive) {
        userMap[userId].lastActive = log.createdAt;
      }
    });

    const users = Object.values(userMap).map((u: any) => ({
      ...u,
      latency: Math.round(u.latency / u.requests) + "ms",
    }));

    return NextResponse.json({
      total,
      success,
      errors,
      avgLatency,
      users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching dashboard" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, slug: { params: Promise<{ discord_id: string }> }) {
    const discord_id = (await slug.params).discord_id;
    const response = await fetch(`https://discord.com/api/v10/users/${discord_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        },
        next: {
            revalidate: 60 * 60 * 24 * 7 // 1 week, we dont need to update this often.
        }
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "User not found or Discord API error" },
            { status: response.status }
        );
    }

    const data = await response.json();

    let avatarUrl = `https://cdn.discordapp.com/embed/avatars/${(BigInt(data.id) >> 22n) % 6n}.png`;

    if (data.avatar) {
        const format = data.avatar.startsWith("a_") ? "gif" : "png";
        avatarUrl = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${format}`;
    }

    return NextResponse.json({
        id: data.id,
        global_name: data.global_name,
        username: data.username,
        avatar: avatarUrl,
    }, {
        status: response.status,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
}

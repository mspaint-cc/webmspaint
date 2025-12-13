import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, slug: { params: Promise<{ discord_id: string }> }) {
    const discord_id = (await slug.params).discord_id; // get discord id from url parameter
    const response = await fetch(`https://discord.com/api/v10/users/${discord_id}`, { // send request to the discord api using the bot token to get a users information
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        },
        next: {
            revalidate: 60 * 60 * 24 * 7 // 1 week, we dont need to update this often.
        }
    });

    if (!response.ok) { // validate if the request was suceessful
        const errorMessage = response.status === 404 
            ? "Discord user not found"
            : response.status === 401 || response.status === 403
            ? "Discord API authentication error"
            : "Discord API error";
        return NextResponse.json(
            { error: errorMessage },
            { status: response.status }
        );
    }

    const data = await response.json(); // parse response
    if (!data.id) { // validate if the discord id exists in the response
        return NextResponse.json(
            { error: "Invalid Discord API response" },
            { status: 502 }
        );
    }

    let avatarUrl = `https://cdn.discordapp.com/embed/avatars/${(BigInt(data.id) >> BigInt(22)) % BigInt(6)}.png`; // generate default avatar url and parsing the snowflake to an index

    if (data.avatar) { // check if avatar exists
        const format = data.avatar.startsWith("a_") ? "gif" : "png"; // check if the avatar is an animated image
        avatarUrl = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${format}`; // build new avatar URL
    }

    return NextResponse.json({ // send response back
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

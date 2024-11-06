"use client"

import MessagesPane from "./pane";

import { useEffect, useState } from "react";
const systemChat = "You are a helpful assistant that gives accurate, concise answers. You are capable of generating both text and images in your responses.";
const systemImage = "You are a prompt analyst tasked with determining whether a user's prompt wants to generate plain text or images. If the user wants to generate an image, respond with 'image'. Otherwise, respond with 'text'. Always respond with only one word, either 'image' or 'text'.";

async function chat(system, messages=[]) {
    return await (await fetch("https://text.pollinations.ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [{ role: "system", content: system }].concat(messages),
            seed: 42,
            model: "openai",
            jsonMode: false
        })
    })).text();
}

function image(prompt) {
    return `$SanjayOS_Prompt$![${prompt}](https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=0&nologo=true&private=true)`;
}

export default function MessagesChatBot({ user, pfp, defaultColor, system=systemChat }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    async function sendChat(message, ignoreYourChat=false) {
        // Add your chat message
        let newMessages = [...messages];
        if (!ignoreYourChat) newMessages.push(
            { username: "You", message, timestamp: new Date() }
        );
        setMessages(newMessages);

        // Reveal loading indicator
        setLoading(true);

        // Store chat bot response
        let response;

        // Check if user wants to generate an image
        let imageCheck = await chat(systemImage, [{ role: "user", content: `Determine whether the following prompt wants to generate text or an image, responding with a one-word answer of 'image' or 'text':\n\n${message}` }]);

        // Generate an image
        if (imageCheck.match("image")) {
            response = image(message);
        }
        // Generate a chat
        else {
            response = await chat(system, newMessages.map(m => ({
                role: m.username == "You" ? "user" : "assistant",
                content: m.message
            })));
        }

        // Hide loading indicator
        setLoading(false);
        
        // Add response message
        setMessages(newMessages.concat([{
            message: response,
            timestamp: new Date()
        }]));
    }

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            sendChat("Introduce yourself!", true);
        }
    });

    return (
        <MessagesPane messages={messages} user={user} pfp={pfp} defaultColor={defaultColor} onChat={sendChat} loading={loading} />
    );
}
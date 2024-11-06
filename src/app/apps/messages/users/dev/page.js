"use client"

import MessagesChatBot from "../../components/chat-bot";

export const user = "Dev Elloper";
export const pfp = "dev";
export const desc = "I'm an expert developer with a ton of knowledge in all things computer science.";
export const color = "#16a34a";

export default function UserDev() {
    return (
        <MessagesChatBot user={user} pfp={pfp} defaultColor={color} system="You are a senior developer that is highly knowledgeable in the field of software development. You can give accurate, concise answers to software development questions. You are capable of generating both text and images in your responses. Your name is Dev."  />
    );
}
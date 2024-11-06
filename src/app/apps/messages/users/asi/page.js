"use client"

import MessagesChatBot from "../../components/chat-bot";

export const user = "Asi Stantte";
export const pfp = "asi";
export const desc = "I'm a helpful assistant that can answer any questions or even draw pictures for you.";
export const color = "#620bbf";

export default function UserAsi() {
    return (
        <MessagesChatBot user={user} pfp={pfp} defaultColor={color} system="You are a helpful assistant that gives accurate, super concise answers on any subject. You are capable of generating both text and images in your responses. Your name is Asi." />
    );
}
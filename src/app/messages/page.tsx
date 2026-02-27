
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, User, MoreVertical, Circle } from "lucide-react";

const CONTACTS = [
  { id: "1", name: "Dr. Sarah Mitchell", lastMsg: "See you at our appointment today.", time: "2:15 PM", unread: true, online: true },
  { id: "2", name: "Dr. James Wilson", lastMsg: "How are you feeling today?", time: "Yesterday", unread: false, online: false },
  { id: "3", name: "Dr. Emily Chen", lastMsg: "The prescription has been sent.", time: "Jan 12", unread: false, online: true },
];

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-140px)]">
      <div className="grid lg:grid-cols-12 h-full gap-0 border rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Sidebar */}
        <div className="lg:col-span-4 border-r flex flex-col">
          <div className="p-4 border-b space-y-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10 bg-muted/50 border-none" placeholder="Search conversations..." />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {CONTACTS.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${activeContact.id === contact.id ? 'bg-primary/5' : ''}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm truncate">{contact.name}</h3>
                      <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className={`text-xs truncate ${contact.unread ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                      {contact.lastMsg}
                    </p>
                  </div>
                  {contact.unread && (
                    <Circle className="h-2 w-2 fill-accent text-accent shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="hidden lg:col-span-8 lg:flex flex-col bg-muted/10">
          <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-sm">{activeContact.name}</h2>
                <p className="text-[10px] text-green-600 font-semibold">{activeContact.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex justify-center">
                <span className="text-[10px] text-muted-foreground bg-white px-2 py-1 rounded-full border uppercase tracking-wider">Today</span>
              </div>
              
              <div className="flex items-end gap-2 max-w-[70%]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm">
                  {activeContact.lastMsg}
                </div>
              </div>

              <div className="flex items-end gap-2 justify-end">
                <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-none shadow-md text-sm max-w-[70%]">
                  Hello Doctor, I wanted to follow up on my recent consultation. I'm feeling much better now.
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 bg-white border-t">
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setMessage(""); }}>
              <Input 
                className="flex-1 bg-muted/30 border-none" 
                placeholder="Type your message here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button className="bg-primary hover:bg-accent shrink-0" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

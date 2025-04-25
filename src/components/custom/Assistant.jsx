import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaPaperPlane } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';


/**
 * Assistant component renders a chatbot interface.  It sends user messages to a backend API
 * and displays the conversation history. Includes loading indicators and error handling.
 *
 * @returns {JSX.Element} The Assistant component.
 */


function Assistant() {

  // State variables
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const endref = useRef(null);

  useEffect(() => {
    endref.current?.scrollIntoView({ behavior: "smooth" });
  });

  /**
     * Sends the user's message to the backend API and updates the chat history.
     * Includes error handling and loading state management.
     */
  const getResponse = async () => {

    const trimmedInput = input.trim(); // Trim whitespace from the input

    if (!trimmedInput) {
      toast('Please enter your query!');
      return;
    }
    if (loader) {
      toast('Please wait! AI model is thinking.');
      return;
    }

    setLoader(true); // Show the loading indicator
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: trimmedInput, sender: "user" }, // Add user message to the chat history
    ]);
    setInput(""); // Clear the input field


    try {
      // Fetching the response from AI
      const response = await fetch("http://127.0.0.1:5000/api/assistant/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `${trimmedInput} (Try to concisely respond with maximum 150 tokens and in a single paragraph and also the key of the response value is named as response.)`,
      });

      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error details from the response
        throw new Error(`API request failed with status ${response.status}: ${errorData.message || response.statusText}`);
      }

      const data = await response.json(); //Parse the JSON response from the backend.
      const botResponse = data.response; //Extract the actual bot response.
      setMessages((message) => [
        ...message,
        { text: botResponse || "I can't understand please try again. 🤖", sender: "bot" },
      ]);

    } catch (err) {
      console.error("Error fetching response:", err); // Log the error for debugging
      toast("Error: Could not get a response from the AI. Please try again later."); //Inform the user
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong. 🤖", sender: "bot" },
      ]);
    } finally {
      setLoader(false); // Always set loading to false after the API call, regardless of success or failure
    }

  };

  return (
    <div>

      {/* Chatbot dialog */}
      <Dialog>
        <DialogTrigger className='fixed bottom-16 left-16 flex items-center justify-center h-16 w-16 rounded-full border-[3px] border-green-500 text-3xl bg-neutral-900 shadow-[5px_5px_15px_black] cursor-pointer'>
          🤖
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing when clicking outside
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing when pressing Escape key
          className="h-3/4 w-1/2 bg-green-300 font-baloo flex items-center justify-center flex-col gap-8"
        >

          {/* Chatbot header */}
          <DialogHeader>
            <DialogTitle className='flex items-center justify-center gap-2'>
              <FaPaperPlane className='text-3xl' />
              <span className='text-2xl font-bold'>JourneyCraft AI</span>
            </DialogTitle>
          </DialogHeader>

          {/* Chat history and input area */}
          <div className='h-full w-full flex items-center justify-between flex-col gap-4'>

            {/* Scrollable chat history */}
            <div className='h-[360px] w-full border-[3px] border-neutral-900 rounded-3xl overflow-y-scroll p-4 scroll-hiding bg-green-50 shadow-inner shadow-black'>
              {messages.map((msg, index) => {
                return <div
                  key={index}
                  className={`flex mb-2 ${msg?.sender === "user" ? "justify-end" : "justify-start"
                    }`}>
                  <div
                    className={`py-2 px-3 rounded-lg max-w-xs ${(msg?.sender === "user") ?
                      "bg-green-700 text-white self-end"
                      : "bg-neutral-700 text-white self-start"
                      }`}>
                    {msg?.text}
                  </div>
                </div>
              })
              }

              <div ref={endref}></div>
            </div>

            {/* Input field and send button */}
            <div className='flex items-center justify-center gap-4 w-full'>
              <Input
                type="text"
                placeholder="Ask me something..."
                className='w-[400px] shadow-md shadow-[rgb(0,0,0,0.6)]'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={() => getResponse()}
                className='cursor-pointer bg-neutral-900 py-2 px-4 rounded-lg font-medium text-green-500 text-lg hover:text-green-200 transition-all duration-300 shadow-[0_0_9px_black]'>
                {
                  (loader)
                    ? <Loader2 size={20} className="animate-spin" />
                    : <Send size={20} />
                }
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Assistant

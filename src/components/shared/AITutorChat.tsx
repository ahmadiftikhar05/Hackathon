import { useState } from "react";
import { Sparkles, X, Send, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string; code?: string };

const QUICK = ["Explain transformers", "Show me Python code", "Help with my quiz", "Career advice"];

function fakeReply(input: string): Msg {
  const i = input.toLowerCase();
  if (i.includes("code") || i.includes("python")) {
    return {
      role: "ai",
      text: "Here's a quick example:",
      code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("atomcamp"))`,
    };
  }
  if (i.includes("transformer")) {
    return { role: "ai", text: "Transformers are sequence models built on self-attention. They process tokens in parallel and use positional encodings to keep order. The original paper is 'Attention is All You Need' (2017)." };
  }
  if (i.includes("quiz")) {
    return { role: "ai", text: "Sure — open a quiz from your Quizzes tab. I can walk you through one question at a time. Which course is the quiz in?" };
  }
  if (i.includes("career")) {
    return { role: "ai", text: "Focus on building 2–3 portfolio projects you can demo end-to-end. Recruiters care more about shipped work than course certificates." };
  }
  return { role: "ai", text: "Got it! I'm a demo tutor — try asking about Python, transformers, or your current quiz." };
}

export function AITutorFab() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm your atomcamp AI tutor. Ask me anything about your courses." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, fakeReply(text)]), 400);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg",
          "bg-secondary text-secondary-foreground flex items-center justify-center",
          "hover:scale-105 transition-transform"
        )}
        aria-label="Open AI tutor"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)}>
          <aside
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-card border-l border-border flex flex-col animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 px-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">AI Tutor</div>
                  <div className="text-xs text-muted-foreground">Always available</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                      m.role === "user"
                        ? "bg-navy text-navy-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.code && (
                      <pre className="mt-2 bg-navy text-navy-foreground rounded-lg p-3 text-xs overflow-x-auto">
                        <div className="flex items-center gap-1.5 text-secondary mb-1.5">
                          <Code2 className="h-3 w-3" /> python
                        </div>
                        <code>{m.code}</code>
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" className="p-1.5 rounded bg-secondary text-secondary-foreground">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

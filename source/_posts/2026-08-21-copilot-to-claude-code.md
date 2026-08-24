---
layout: post
title: "Copilot is agent-first, Claude Code is skill-first"
date: 2026-08-21 08:00:00
comments: false
categories: al
image: /images/copilottoclaudecode/main.png
---

I love ***GitHub Copilot***. I always have. But I also started using ***Claude Code*** as my main driver a few months ago, and I figured the transition would be smooth. It mostly was, for me. Then we started trying *Claude Code* out for part of our organization, and I found out fast that it's not really a one-to-one switch. Not when you've already built agents and skills specifically for Copilot.

The most common question I get from people making that switch is *"how do I switch to my custom agents now?"* And the answer is: **you don't**.

![Copilot's agent dropdown, a list of custom agents to step into](/images/copilottoclaudecode/copilot-agent-dropdown.png)

That answer isn't useful on its own though. So here's what I've learned about carrying an agentic workflow from *Copilot* over to *Claude Code*, and why it made me realize that Copilot is "agent-first" and Claude Code is "skill-first".

The first instinct, mine included, is that *agent* becomes *agent*. Same word, same idea of a markdown file with frontmatter describing a persona and a set of tools, surely it just carries over. It doesn't, not fully.

Every custom agent in *Claude Code* is **a subagent**. There's no other kind. Whatever you define, it forks off a clean, empty context window, does its work in there, and hands your main session back a condensed report. Nothing it read or tried comes back with it, only the summary.

*Copilot* has two different kinds of custom agents. The ones you spin up through `runSubagent`, the ones behind ***[vol.3's][copilotpostvol3]*** parallel research example, already fork and report back exactly like a *Claude Code* subagent does. Those transfer directly.

The ones you step into from the dropdown are the other kind, and they don't behave the same way at all. Stepping into one prepends its whole body, persona and instructions and all, to the conversation you're already having. It's still your conversation, just handed a new voice, nothing forks, nothing comes back as a summary because nothing ever left. That's the half of your scaffold that doesn't have an agent waiting for it on the Claude Code side.

This one actually maps closer to a **skill** than a subagent.

---

### Why Claude Code feels skill-shaped

*Copilot* is agent-first: you pick who you're talking to before you say anything. *Claude Code* is skill-first, because there's only ever one *you're talking to*, the same agent from the moment you open the terminal to the moment you close it. You don't instantiate a persona. You tell the one you already have what it needs to know for this particular task.

![Claude Code's startup screen, nothing to select](/images/copilottoclaudecode/claude-code-nothing-to-select.png)

In *Copilot*, selecting an agent from the dropdown was the act of giving your conversation context: this persona, these instructions, this scoped set of tools. In *Claude Code*, that same act is invoking a skill. What used to be *"step into Backlog Reviewer, type start with task 1123"* becomes `/start-feature 1123`.

---

### Don't over-rotate

If you stop there and turn every single Copilot agent into a skill, you'll have thrown away context isolation on the way.

Here's a test you can run against your own memory instead of a rule to memorize. Think about the last few times you stepped into a Copilot agent. When it finished, did you keep working in that same chat? Or did you take what it gave you, a plan, a summary, a list of files, and go start something else with it?

If you routinely carried the output somewhere else, you were doing context isolation by hand, one copy-paste at a time. That agent wanted to be a subagent all along.

---

### So is it a skill or a subagent?

Here's how I decide:

**Do you need to type it?** If you want a `/something` you can fire on demand, it's a skill. You can ask Claude Code to use a particular subagent, but you can't invoke one by name the way you'd pick an agent from a dropdown.

**Where does the work belong?** In the conversation you're already having (skill), or in a clean window that reports back when it's done? (subagent)

The two do overlap a bit. If you want to type it and you want it isolated, a skill can be told to fork (`context: fork`), but that's a post of its own and you don't need it to do the sort.

---

### The tools list breaks

When you move agents to Claude Code, two things happen.

The tools list breaks for a shallow reason first: the names are just different. A `tools:` array full of Copilot's `edit` and `search` means nothing to *Claude Code*, which wants `Edit` and `Glob`. I ran into this shipping a plugin across both ecosystems, the fix was listing both platforms' names side by side in one array, each tool only recognizing its own, covered in ***[the plugins post][agentpluginspost]***.

![VS Code flagging Read as an unknown tool, Copilot doesn't recognize Claude Code's name for it](/images/copilottoclaudecode/unknown-tool-warning.png)

But there's a second, bigger break underneath that one. In *Copilot*, restricting tools was a property of the agent you stepped into. Step into the read-only reviewer, and for as long as you're in that chat, editing isn't on the table. In *Claude Code*, a skill loaded inline can't restrict anything, because it's just text your main agent reads and can weigh against everything else in the conversation. Your main session holds every tool and every MCP server you've configured, and loading a skill only adds words on top, nothing gets taken away.

In *Copilot* that guarantee lived in the agent you stepped into. In *Claude Code* it has to live in the thing you dispatch to. So if *"this must never touch a file"* is critical, **don't put it in a skill, put it in a subagent, where `Edit` isn't an option**.

---

### Can you really have one plugin for both ecosystems?

Not as cleanly as I made it sound in ***[the plugins post][agentpluginspost]***, one shared `agents/` folder, same file read by both ecosystems. That's still true for where the file lives. It's less true based on what's inside, because a *Copilot* dropdown agent and a *Claude Code* subagent are playing two different roles. In practice I've ended up diverging most of mine per platform rather than sharing them, so it's worth deciding upfront whether you actually want one shared set of agents, or you're fine maintaining two. All skills I had on the Copilot side however are still the same skills on the Claude Code side.

---

Don't translate your Copilot agent folder file-for-file. Sort each agent by what it actually did, isolated fork or same-conversation persona, not by what kind of file it lives in, and let the skill/subagent split in *Claude Code* fall out of that sort. But don't worry about your skills, they carry over just fine.

[copilotpostvol3]: /blog/2026/copilot-fancy-autocomplete-vol3/
[agentpluginspost]: /blog/2026/agent-plugins/

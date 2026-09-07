---
layout: post
title: "Claude Code: Tiny Tips"
date: 2026-09-07 08:00:00
comments: false
categories: al
image: /images/claudecodetinytips/main.png
---

When we move devs to *Claude Code*, I usually give them a quick "here's what's good to know about this tool" rundown. After a few rounds of that, a handful of commands keep coming up as *"huh, didn't know that."*

Here's my go-to list. Note: I use the terminal, not the VS Code extension, so not everything below is accessible from there as far as I know.

### Map a shortcut for new terminals

In VS Code, map the **"Terminal: Create Terminal in Editor Area"** action to a keyboard shortcut so you can spin up a new *Claude Code* session without touching the mouse. I have mine on `Ctrl + Alt + T`.

### Stop the terminal from swallowing your shortcuts

With a terminal focused, `Ctrl + B` should toggle VS Code's sidebar, but the shell running inside the terminal grabs the keypress first and VS Code never sees it. Add `workbench.action.toggleSidebarVisibility` to `terminal.integrated.commandsToSkipShell` in your `settings.json` and VS Code handles the shortcut itself instead of forwarding it to the shell:

```json
"terminal.integrated.commandsToSkipShell": [
    "workbench.action.zoomIn",
    "workbench.action.zoomOut",
    "workbench.action.toggleSidebarVisibility"
]
```

### `/tui fullscreen`

Cleans up the terminal GUI and removes the flicker you get on every redraw.

### Porting agents isn't a copy-paste

You can't port agents directly to *Claude Code* because the tool names are different from *Copilot*'s. Ask the AI for help translating them, I've got a whole separate post on this one alone: ***["Copilot is agent-first, Claude Code is skill-first"][copilottoclaudecode]***.

### `/doctor`

Lets the AI analyze your agents, skills, and instructions. Quite useful right after you've ported something over and want to know what can be improved.

### `/model opusplan`

*Opus* for planning, *Sonnet* for execution, switched automatically as you move between the two. This option isn't selectable through the UI, you have to set it with the command.

### `/advisor`

When *Sonnet* gets stuck, it can reach out to *Opus* or *Fable* on its own for a second opinion.

### `/rewind`

Undoes changes and resets the state and conversation back to a previous prompt. Cheaper than starting a whole new session when a change went sideways.

### Left arrow key

Gets you to the overview of all sessions. I prefer separate terminal windows per session myself, but some people like having this single view instead.

---

Do you have any tiny tips of your own that help you work with *Claude Code*? I'd genuinely like to hear them.

[copilottoclaudecode]: /blog/2026/copilot-to-claude-code/

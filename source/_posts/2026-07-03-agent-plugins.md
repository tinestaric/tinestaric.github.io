---
layout: post
title: "Distributing Agents with Plugins"
date: 2026-07-03 08:00:00
comments: false
categories: al
image: /images/agentplugins/main.png
---

The post ***[Copilot is just a fancy autocomplete vol.3][copilotpostvol3]*** ended with "go build yourself one agent, just one, it doesn't need to be the whole suite." Turns out that's the easy part. The question I actually get, almost every time I run a session on building custom agents, is the one that post doesn't answer at all: **okay, I built one, now how does the rest of my team get it?**

I've been sitting on this question since ***EMEA 2025***, where ***[waldo][waldo]*** told me, mid-conversation, that he'd just vibe-coded a *VS Code extension* that drops his team's agents straight into everyone's editor. I thought it was a great idea. I also didn't move an inch on it, because I was still convinced everyone should be building their own agents first. Handing someone a finished suite felt like the wrong lesson to teach this early.

The push to actually revisit it came a few days ago, when waldo published ***[The Waldo Way][waldowaypost]***, the writeup of that same extension, now called the ***iFacto Playbook***, and the doubt that came with shipping it: did removing all the setup friction also remove the learning that used to happen inside that friction? I don't have that answer either. But reading it put the original question back in front of me, and this time I actually sat with it instead of shelving it again.

A **default set of agents** doesn't have to cost you the other option. It can spark exploration for the people who'll eventually go build their own. And it stops blocking the people who don't have the time this sprint, whose deadline doesn't care whether they've found the time to play around with agents yet.

So: we need a default set. The only real question left is how you get it in front of people without it turning into "well, it works, but is this actually what I'd recommend to every partner?"

---

### Nearly missing the point of packaging

My first instinct was to do what waldo did: build the extension, ship it to the team. But "is this really the recommendation I'm going to give to every single partner?" kept nagging at me. Somebody always has to maintain it, and it's not a lot of maintenance, but it also becomes a blocker the moment there isn't a plug-and-play way for the next partner to get the same thing.

So my mind went to a community extension instead: something generic you point at a repository, and it pulls everything down for everyone in your org. Which, funnily enough, is almost exactly what already exists. I just didn't recognize it, because I'd already dismissed the concept once this year.

**Plugins.**

They were the one piece I never fully got when I was relearning this whole space at the start of the year. Agents, skills, MCPs, hooks, those all clicked fast, they're just files you can already share, point someone at a repo and tell them to copy them in. So I couldn't see what a "plugin" added on top. Packaging felt like a solution to a problem I didn't have.

Turns out I just hadn't asked the right question yet. The moment I framed it as *distribution*, how do these files reach everyone's editor without every developer manually copying files into the right folder, it was an instant, face-palm-obvious "oh, that's what packaging is for." A plugin isn't a new way to write an agent or a skill. It's a folder that bundles the ones you already have, hosted in a repo, that anyone can install with one click and update the same way.

And the part that actually got me to build one: the exact same plugin repo works for both **GitHub Copilot** and **Claude Code**. One repo, two ecosystems.

Here's the install experience, from the other side, the side your teammates actually see.

First, someone adds your repo as a marketplace, once, in their `settings.json`:

![Registering a plugin marketplace in settings.json](/images/agentplugins/settings-marketplace.png)

Then they open the *Agent Customizations* panel from the command palette:

![Opening Chat: Open Customizations from the command palette](/images/agentplugins/open-customizations-command.png)

Go to *Plugins*, hit *Browse Marketplace*, and there's the plugin, ready to install:

![Browsing the marketplace and finding the plugin](/images/agentplugins/plugins-browse-marketplace.png)

![Installing a plugin from the marketplace](/images/agentplugins/plugin-install.png)

One click, and every agent in that plugin shows up in the agent picker, no config, no copy-pasting `.md` files into the right folder by hand:

![All the agents from the plugin now available in the agent picker](/images/agentplugins/agent-list-dropdown.png)

When I push changes to the repo, they don't need to reinstall anything. One command syncs everything the plugin brings in, agents, skills, MCP config, all of it:

![Running Chat: Update Plugins to pull the latest changes](/images/agentplugins/update-plugins-command.png)

That's it. That's plug-and-play, and nobody had to build a custom extension to get there.

If you're on *Claude Code* instead of VS Code, same idea, just a terminal UI instead of a panel. `/plugin` gets you the same tabs: *Marketplaces* to register the repo, *Discover* to find and install a plugin, *Installed* to see what you've got and check for updates:

![Adding a marketplace from the Claude Code /plugin UI](/images/agentplugins/cc-plugin-marketplaces-tab.png)

![Discovering hello-plugin in the marketplace](/images/agentplugins/cc-plugin-discover-tab.png)

![hello-plugin installed, with its agents, skills, and MCP servers all listed](/images/agentplugins/cc-plugin-installed-tab.png)

---

### What's actually in the repository

I put together a stripped-down version of what I now use as a template, ***[plugin-marketplace-sample][samplerepo]***, so you can see the whole thing at once instead of just screenshots. Two kinds of file make this work: **marketplace manifests** and **plugin manifests**.

At the repo root, you need a marketplace manifest per ecosystem, since each one looks in a different spot:

```
.github/plugin/marketplace.json      (GitHub Copilot)
.claude-plugin/marketplace.json      (Claude Code)
```

Both files say the same thing, just to a different audience. A name for the marketplace, an owner, and a list of the plugins it serves, each one pointing at the folder it lives in:

```json
{
  "name": "sample-marketplace",
  "owner": { "name": "Your Org", "url": "https://github.com/your-org" },
  "plugins": [
    {
      "name": "hello-plugin",
      "source": "./plugins/hello-plugin",
      "description": "Minimal example plugin demonstrating a skill and an agent shared between Claude Code and GitHub Copilot"
    }
  ]
}
```

That's the whole catalog. This is the file that turns a plain repo into something you can register as a marketplace in `settings.json`.

The actual plugin lives in the folder that `source` points to, and it carries its own manifest, again one per ecosystem:

```
plugins/hello-plugin/
  plugin.json                  (Copilot plugin manifest)
  .claude-plugin/
    plugin.json                (Claude Code plugin manifest)
  agents/                      (GitHub Copilot agents, Copilot's default folder)
  agents-claude/               (Claude Code agents)
  skills/
    hello-skill/
      SKILL.md
  .mcp.json                    (MCP servers, shared)
```

Copilot's `plugin.json` stays minimal, `agents/` and `skills/` are already its default folder names, so there's nothing to point at:

```json
{
  "name": "hello-plugin",
  "description": "Example plugin: one skill, one agent, shared between Copilot and Claude Code",
  "version": "0.1.0",
  "author": { "name": "Your Org" }
}
```

Claude Code is where I initially got this wrong. I assumed pointing it at a differently-named folder would work the same way Copilot's `agents` override does, `"agents": "agents-claude/"`. It doesn't. Claude Code's plugin.json wants an explicit list of the individual agent files, not a folder:

```json
{
  "name": "hello-plugin",
  "description": "Example plugin: one skill, one agent, shared between Copilot and Claude Code",
  "version": "0.1.0",
  "author": { "name": "Your Org" },
  "agents": ["./agents-claude/hello-agent.agent.md"]
}
```

Fine for one agent, but it means every new agent you add for Claude Code needs its own entry in that array, unlike Copilot, which just picks up whatever's sitting in its folder. Small asymmetry, worth knowing about before you add your fifth agent and wonder why it's not showing up.

That's genuinely all there is to the packaging itself, name, description, version, author, and where to find things if they're not in the default spot (or, for Claude Code's agents, an explicit list of them). From there it's exactly what you'd expect: agent `.md` files with their usual frontmatter, skill folders with their `SKILL.md`, an `.mcp.json` if the plugin brings its own MCP servers. Nothing about authoring an individual agent or skill changes, you're just putting them somewhere that can be distributed.

This works over a plain *GitHub* repo or an *Azure DevOps* repo, whichever your org already uses for source control. No new infrastructure.

---

### The one place the two ecosystems diverge

Skills, MCPs, hooks, all of it is genuinely shared between the two. Write it once, both platforms read the same files.

Agents are the exception, and the reason is almost petty: *GitHub Copilot* and *Claude Code* name their built-in tools differently. Copilot's `edit`, for instance, is split into Claude's `Edit` and `Write`. Small differences, but enough of them that an agent definition written for one doesn't just work for the other, hence `agents/` for Copilot and `agents-claude/` for Claude Code, sitting side by side with near-identical content.

That split sounds like it should be annoying to maintain, two folders to keep in sync every time an agent changes. In practice it isn't, because on the actual repo I built for one of our teams, I added a `CLAUDE.md` at the root from the start, telling whichever agent is making the change that both folders need the same edit. One remark up front, and I've never had to think about it since.

One more constraint worth knowing before you set this up yourself: Copilot's `agents/` has to stay flat, no subfolders. `skills/` needs a subfolder per skill (`skills/hello-skill/SKILL.md`, not a loose `hello-skill.md`), and inside that folder you can nest whatever you want, scripts, references, more subfolders, no problem. What you can't do is nest the skill folders themselves any deeper, `skills/hello-skill/` works, `skills/category/hello-skill/` doesn't. Ask me how I found that out.

---

### Where this leaves things

Plugins don't tell you what should be inside the box, that's still on you and your team to figure out. But they remove the excuse for not shipping a default set at all. You're no longer choosing between "build everyone their own extension" and "make people fend for themselves." A plugin repo costs you a couple of manifest files and some discipline about where things live, and from there it's one install command for anyone on your team, in whichever editor they already use.

Go build that one agent from vol.3. Then put it somewhere the rest of your team can actually reach. Clone ***[the sample repo][samplerepo]*** if you want a starting point.

[copilotpostvol3]: /blog/2026/copilot-fancy-autocomplete-vol3/
[waldo]: https://www.linkedin.com/in/ericwauters
[waldowaypost]: https://waldo.be/2026/06/29/the-waldo-way/
[samplerepo]: https://github.com/tinestaric/plugin-marketplace-sample

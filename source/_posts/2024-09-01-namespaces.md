---
layout: post
title: "Namespaces in AL - Is it time to start using them?"
date: 2024-09-01 08:00:00
comments: false
categories: al
image: /images/namespaces/main.jpeg
---
*School’s back*, so it’s time for the blogs to get back! This time I want to take a jab at **namespaces**. Not really the technical ***“how”*** of namespaces. I believe that part is rather easy and has already been covered multiple times. Microsoft presented a [brilliant session][bctechdaysnamespace] about namespaces at [BCTechDays][bctechdays] this year.
Instead I want to focus on ***WHY***. That’s a question I recently received multiple times. *We never needed namespaces in the past, why do we need them now? Do they bring any benefits or are they just a hassle? Is it time to start using them?*

Over the past few months, I got to work on apps that *were namespaced*, apps that *weren’t*, and completely *greenfield* apps where I could decide if we wanted to adopt namespaces or not. So, this post is a view on namespaces from **my perspective**, and feel free to disagree with me. 

<hr/>

### Why Namespaces?

#### Structure

I often do ***“audits”* of large code bases** for partners, trying to determine the *extent of their tech debt*, whether they will ever get to *multi-app architecture*, or reach *AppSource compatibility*. To be able to do that, I need to **understand the app’s architecture**, *what am I even looking at*. 

When I have to work with large apps where the src folder looks like this: 

![Bad folder structure](/images/namespaces/folders-bad.png)

*I take a deep breath*, ask myself 7 times why am I doing this to myself, and then try to make sense of files that are supposedly important, and work my way through their **references**. *It’s never a fun experience.*

On the other hand, if I open a project and the project is separated into areas like this:

![Good folder structure](/images/namespaces/folders-good.png)

It makes a **huge difference**. I can wrap my head around individual parts that **logically fit together**. Structuring your code in **functional areas** does wonders for **discoverability**. *Shocker, right?* Any new developer you try to onboard onto your codebase will have to go through the same process I have to go through, and **high discoverability** makes this process **much smoother**. *If I can’t convince you that the second folder structure is better than the first one, that I probably won’t ever get you to uptake namespaces...*

*Fine Tine, **organized code is better than not organized**, what do **namespaces** have to do with that?*

Well, structuring your code in **folders per functional area** is in my opinion a **prerequisite** for starting with namespaces. Discoverability is something **legacy codebases lack the most**. Not surprising, considering we used to just work with a long list of objects sorted by type and ID. 

Let’s say I open a file like this:

![Enum without namespace](/images/namespaces/enum-no-namespace.png)

*Where does this Enum belong? Who knows...* I have to go **through the references** to figure that out. 

But if it has a namespace defined:

![Enum with namespace](/images/namespaces/enum-yes-namespace.png)

Then I can quickly see it’s **part of the Stock APIs functionality**. And you’re right, if I only care about the **code discoverability**, then I could just look at the folder structure where the *Document Type* file is placed and get the same idea, **I don’t *need* namespaces for that.**

But structuring your codebase and making it discoverable is just **one of the benefits of namespaces**, while it’s the **only benefit** if you use **folders as the only method**. That’s why we should do **both**. Organize code in folders and use namespaces. It makes the project easily discoverable, but also unlocks other benefits of namespaces like **dependency analysis**.

<hr/>

#### Dependency Analysis

Let’s talk about *dependency analysis* next. This one has been huge for me lately. It allows us to ensure that **cleanly architected apps remain clean**. It also helped with **de-tangling** functionalities in **monolithic apps** and breaking down those horrible *“Management” codeunits*. 

<hr/>

I’ll assume you already know that when we start adopting namespaces we move from a ***global namespace***, where we could define any object as a variable, to a ***specific namespace***, where we can only define objects *defined in the same namespace*, *fully qualify object names*, or ***“import” objects*** from other namespaces using a **“using” statement**.

In other words, we used to be able to do this:

![Old way of declaring variables](/images/namespaces/var-declaration-old.png)

With namespaces, *we can’t*:

![Old way breaks when declaring a namespace on the file](/images/namespaces/var-declaration-namespace-error.png)

Unless we do one of the two:

![New way of declaring variables](/images/namespaces/var-declaration-new.png)

Before we get back to dependency analysis, let’s talk about **which of the two options we should go for**. *Fully qualified name, or the using statement.*

We decided to **always go with using statements** in favor of fully qualified names. ***Why?*** Because it allows us to **easily see dependencies** at the top of the file (this is the *dependency analysis* that we’ll get to in a second). We haven’t found a real use case when we’d prefer to go for *fully qualifying names*. In the *C# world*, I’d go for fully qualified names if I’m using **two objects that have the same name** but reside **in different namespaces.** However, in **AL**:
-	We’re quite used to making **globally unique object names**
-	As of now, **can’t define an object with the same name** in the same app, regardless of namespaces

<hr/>

Back to the ***dependency analysis*** now. We now know that anytime we want to define a variable for an object from a different namespace, we have to use a **“using” statement**. This means that from a quick look, we can see **what other modules our object is tied to.**

Here’s how a ***Sales Header*** table looks once *Microsoft* applied the namespace to it:

![Using statements on Sales Header](/images/namespaces/sales-header-using.png)

I couldn’t even capture all of them in one screenshot. There are ***76*** of them. ***Crazy***. Also, a bit *ugly*. But at the same time **a good thing!** At least now *Microsoft* has a **high-level overview** of all the parts that are jammed in the *Sales Header* table and can start working towards **extracting irrelevant parts**. 

By *irrelevant* I don’t mean that the *functionality* is *irrelevant*. But does the *Sales Header* have to be **coupled to Dataverse?** Or *Outlook?* Doesn’t it feel *a bit off?* **Removing Dataverse** functionality shouldn’t **break sales documents**. I’m not trying to diss *Microsoft’s* code. The base app is old, and there’s a lot of **legacy code** in there. Here’s how the relationships in the Base App look like today:

![Spider web of dependencies in the Base App](/images/namespaces/baseapp-web.png)

To be honest, ***we all wrote entangled code*** *like that in the past*. But what I’m trying to say is that with namespaces we can now finally **start spotting these spider webs**. Both in our **old code** and when writing **new code**. Does the latest pull request try to add two ***new “using” statements to a management codeunit?*** Are we creating another ***Swiss army knife*** codeunit? Maybe we should **separate them** and stick to a **single responsibility**.

<hr/>

#### Naming

Naming is a *very common reason* why we’d want to use namespaces in other languages. As we only ever had a ***global namespace*** in AL (and C/AL), all of our objects had to have **globally unique names**. That’s why we had a *“Sales Header”* and a *“Purchase Header”*. If we were in the world of **C#**, these would likely be *Microsoft.Sales.Document.Header* and *Microsoft.Purchase.Document.Header*

**Two *“Header”* objects**, but since they reside in separate namespaces, it’s **not a naming collision**. 

Unfortunately, we’re **not there yet with AL**. Defining two objects with the same name in different namespaces in the same app **produces an error**.

![Two objects with the same name produce an error even with different namespaces](/images/namespaces/naming-collision.png)

Which is weird to me, since what I can do is **define an object** with the **same name** as an object in a **different app**. Like creating my own *Customer* table in my own namespace:

![Defining a Customer object in my own app works fine](/images/namespaces/another-customer.png)

So, **namespaces prevent naming collisions**, but not in the same app?...
*Hopefully, this will work in the future...*

<hr/>

The one naming benefit we however do have is that we don’t have to try and **jam long names in only 30 characters**. 

Here’s an example from one of the projects: ***“MYPETaxFSTBlock”*** <br/>
*Any idea what this is? Yeah, me neither.* *ETax* and *Block* I get, but what’s *FST?*

Well, if we had **namespaces** at the time, this file would likely be

Namespace MyPublisher.**Banking.ETax.Declaration** <br/>
Codeunit 50000 “MYPFormStructureTypeBlock”

By moving the **area** that this objects belongs to **out of the file name**, we free up the 30 characters for **actual name of the file**. This again makes the codebase more **onboarding friendly**. 

<hr/>

### The how of namespaces

I said I won’t go into the **“how”** of namespaces, but I want to mention a couple more technical **good-to-knows** about namespaces

<hr/>

#### How should I structure namespaces?

Here’s what we’re using. Again, only a recommendation and a guideline, deviate from it as much as you’d like.

*\<Publisher\>.\<AppArea\>.FolderStructure*

**Example:** *Companial.Banking.Setup*

> ***Important!*** We don’t (and won’t) register namespaces with MS (like we register affixes), so make sure yours are **unique**.

- **The first part** should be your ***publisher’s name*** to ensure the **namespace is unique** from other partners. 
- **The second part** is the ***App area***. **Not the App name mind you**. We try to find a more *generic* name. Mainly, so that if we'd ever move an object to a different extension, we don't end up with an object that has a **very app specific namespace** and would *"stick out"*. This point is **very applicable to monoliths** that we'll want to break down into smaller apps.
- **The third part** is then the **folder structure**. The actual *path* of the file. This ensures files are **easily discoverable** by following the namespace. 

For comparison, here’s *Microsoft’s* recommendation:

![Microsoft's namespace naming suggestion](/images/namespaces/ms-namespace-structure.png) 

Whatever you do, please **don’t just add one namespace to every object in your project**. Unless your project has *less than 25 objects*, I believe you have **multiple areas** hiding in there.

<hr/>

#### How to ensure I don’t forget to add namespaces?

There’s a **CodeCop warning (*AA0247*)** we can use to help us spot missing namespaces. It’s **disabled by default**, so we have to raise it’s severity in the ***ruleset.json***

![Warning for missing namespaces](/images/namespaces/namespace-warning.png)

<hr/>

#### When should I not adopt namespaces?

If you’re app has a **dependency on another app that has not yet adopted namespaces**. Do not add namespaces to your objects in these cases as **your app will break** once the dependency adopts them. Let me quickly show you **why**:

<hr/>

#### Here’s the *happy path*:

*App A* depends on *App B*. **No namespaces are used.** Everything works.

![Two objects, both in global namespace](/images/namespaces/dependency-both-global.png)

Dependency (*App B*) introduces a namespace. **No issues in *App A***, as we’re still using the **global namespace**

![Dependency introduces namespaces](/images/namespaces/dependency-namespace-first.png)

***App A* now introduces namespaces** and at the same time has to **add a using statement** for the dependency codeunit and can compile against the new version of the *App B*:

![Main app now introduces namespaces](/images/namespaces/dependency-main-namespace-second.png)

<hr/>

#### Now the unhappy path:

*App A* is the first to define a namespace and everything works since the **Dependency is still in the global namespace**:

![Main app introduces namespaces first](/images/namespaces/dependency-main-namespace-first.png)

But now when *App B* adds a namespace, ***App A* is broken** and cannot work with the new version of App B

![Dependency introduces namespaces second](/images/namespaces/dependency-namespace-second.png)

The problem is, that **you don’t know when your dependencies will adopt namespaces**, so I’d personally **avoid them until all dependencies are namespaces**.

In all other cases, I’d say **go for it!**

<hr/>

#### Is adding a namespace a breaking change?

No. Yes, we've seen how it can break dependencies, but it’s not a breaking change in the sense of the **AppSource validation**. You can add namespaces to your objects and still pass the validation.

<hr/>

#### Where can I learn more about namespaces?

**[The recording][bctechdaysnamespace]** of *Microsoft’s* session is a **must-watch** if you’d like to see how they approached the challenge of **namespacing the whole base app**. 

Here's a few common questions they answered in the session:

![Rapid Fire Questions](/images/namespaces/rapid-fire-questions.png)

And of course, the **[official documentation][namespacedocs]** is always a good place to start.

<hr/>

#### So, is it time to use namespaces and should I now go and namespace my huge monolithic app?

*Is it time to use namespaces?* **Absolutely.** Small apps, new apps, greenfield apps, all should start using namespaces. They bring a lot of benefits, and I believe they’re a **step towards a cleaner codebase**.

*But should you go and refactor your huge monolithic app to use namespaces?*

***Probably not.*** I mean, yes, there are benefits to using namespaces, but if you have a huge project, it will take you **a long time to properly segregate objects** into namespaces areas. Unless you have enough time to do it properly, I’d postpone it. Again, **adding a single namespace across the whole project is not a good idea.**

[bctechdaysnamespace]: https://www.youtube.com/watch?v=F8NH69BGnKk
[bctechdays]: https://www.bctechdays.com/event
[namespacedocs]: https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-namespaces-overview

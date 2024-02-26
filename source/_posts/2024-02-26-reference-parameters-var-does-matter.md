---
layout: post
title: "Reference Parameters - var does matter"
date: 2024-02-26 08:00:00
comments: false
categories: al
image: /images/by-reference-by-value.jpeg
---
I previously posted about [Pitfalls of var parameters][pitfallsofvarparameters] and how things can go sideways if we’re not careful when using them.

What I wrote there in regards to marking *reference* parameters with var was:

> *Var modifiers don’t make a difference, but you should still use them to signal the intentionality of your procedure. If the procedure intends to modify the parameter, add a var in front of it, if it’s only reading data, skip it.*

Now, what I wrote there still holds, regardless of using var with a reference data type parameter we’re able to make changes to it and those changes are reflected outside our local procedure. But thanks to [Arend-Jan Kauffmann][arendjankauffmann] for pointing out, that that **wasn't the full truth**. Marking a reference parameter with a var or not **actually does play a role**, and this post is about clarifying how and why it’s important we think about it in our **event-driven world of extensions**.

<hr/>

### tl/dr
When we’re passing a reference type parameter to a procedure **without var**, we’re passing the **reference** by value. The procedure can make all the changes to the instance it points to, however, it **cannot change the reference so it would point to a different instance**. When passing the parameter **with var**, we can **also change the reference**.

<hr/>

Okay, now that that’s out of the way, let’s go through this again, but with an example or two, to make this a bit easier to understand.
Let’s take the same List example as last time. We know that **both of these result in the same outcome**. In both cases, **var or no var**, we end up with a list with **2 items**.

![Add to List - No var](/images/ref-param-list-add-no-var.png)

![Add to List - var](/images/ref-param-list-add-var.png)

<hr/>

Let's make these examples weirder, so we can see where **var** starts making a difference.

![Change List Reference - No var](/images/ref-param-list-change-reference-no-var.png)

What do you think the count is going to be here? *1? 2? 3?* Well, let's see...

![Change List Reference - Count - No var](/images/ref-param-list-change-reference-no-var-count.png)

**It’s one.** Before we explain again what’s happening, let’s take a look at the same example if the list parameter is marked with var:

![Change List Reference - var](/images/ref-param-list-change-reference-var.png)

![Change List Reference - Count - var](/images/ref-param-list-change-reference-var-count.png)

This time the result is more along the lines of what we’d expect. *So why this difference in behavior?*

When passing a reference type, something like a list, we’re **not passing an actual list**, but only a **reference to that list**. *A pointer, a location.* Similar to having a piece of paper where the address of a house is written on. When passing it to a procedure, you’re not passing the whole house, just this *piece of paper* with the address. So when we’re talking about passing it by reference (with var) or by value (without var), we're talking about passing the **reference** by value or by reference. In our case, this piece of paper with the address. In both cases, someone can go to the house and **put something in** the house, or **take something out** of it. However, if we give them the address by value (without var), we’re saying, *you can find the house here, do what you want in the house, but you **can’t change the address** on this paper.* When we pass it by reference (with var), they can also **change the address** so it points to a **different house altogether**. 

And that’s what’s happening in our list example above. We got the *address* to our List (MyList), but then we created a **completely new list** (MyList2) and tried saying, *"Hey, MyList address should now point to this new list"*. When the parameter is passed without var, we **cannot do that**, hence, when the procedure finishes, MyList still **points to the original List** with only 1 item (“Hello”).

In the second example, because MyList is **passed with var**, we can change it, so that it **points to the new List**, MyList2.

<hr/>

*"Okay Tine, fine, I get it, but so what? I mean, who in their right mind goes and creates a new list, if they get one passed in as a parameter…"*

Yeah, fair point. But keep in mind, that any procedure that **returns a list** actually **creates a new instance**. So it’s not that uncommon.

 ![Assign Invoices - No var](/images/ref-param-invoice-change-reference-no-var.png)

The above example **won’t work**, but it will if the parameter is marked with var:

 ![Assign Invoices - var](/images/ref-param-invoice-change-reference-var.png)

so will this:

 ![Assign Invoices - var](/images/ref-param-invoice-add.png)

*“Fine, be mindful of how you assign to lists. Why don’t I just **always mark reference parameters with var**? One less thing to worry about...”* 

**Bad idea.** 

Especially when you work with events. Let me give you an example with a reference type that will make it more obvious:

 ![Interface - Main](/images/ref-param-interface-main.png)

We have a simple procedure that sets a value, exposes the interface through an event, and then gets the value. Let’s take a look at the interface implementation:

 ![Interface Implementation - Normal](/images/ref-param-interface-normal.png)

*Simple, right?* One procedure sets the value, and the other reads it. So let’s turn our attention to the event over there. If we expose the interface **by value**, subscribers can **only access the procedures of that interface**.

 ![Interface Event - No var](/images/ref-param-interface-event-no-var.png)

On the other hand, if you expose it **by reference**, a subscriber can also **change the implementation** that the interface is referencing:

 ![Interface Event - var](/images/ref-param-interface-event-var.png)

And that can lead to **unpredictable behavior** for your app, especially if the new implementation does something stupid like:

 ![Interface Implementation - Wild](/images/ref-param-interface-wild.png)

But hey, maybe that's exactly **what you wanted**. The option for subscribers to **change the implementation** interface points to. So there's no *always right* or *always wrong* answer here. 

<hr/>

Now, in summary, *should you use var with reference parameters? or should you not?* It comes down to the usual **“It depends”**. What I’m hoping to achieve with this blog is for us to **be mindful that there is a difference** and you should think about *“Do I want the procedure to only modify the instance of a variable, or should I let it change the reference to a completely different instance?”* and that we don't just **blindly mark or not mark parameters with var**.

[pitfallsofvarparameters]: https://tine.staric.net/blog/2024/3-pitfalls-of-var-parameters/
[arendjankauffmann]: https://www.linkedin.com/in/ajkauffmann
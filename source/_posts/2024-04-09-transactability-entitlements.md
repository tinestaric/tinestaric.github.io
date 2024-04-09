---
layout: post
title: "AppSource Transactability - The AL side of the story"
date: 2024-04-08 08:00:00
comments: true
categories: al
image: /images/entitlements/main.jpeg
---
I spent the last few weeks taking another look at the **AppSource transactability** we got a wave or two ago. The idea is quite neat, we're not *monetization specialists*, we add value by **enhancing the product**, so why should we bother with a monetization engine, let Microsoft do that for us. *Sure, it sounds good*, but the experience was less smooth than I'd like it to be. So here's a rundown of what you should know before you start your **transition to AppSource transactability** from a technical perspective.

<hr/>

### A quick recap

We're used to using **license** (*.flf/.bclicense*) files **OnPrem** to ensure only licensed users can access our range of objects, so even if a user has **SUPER** permissions, they **won't be able to access an object** that's not in their license. 

But the **Cloud** doesn't use license files anymore. That means if a customer installs your app, they have **access to all objects**, and mind you, even if you have your offer set to »Contact Partner« in AppSource, your app can still be installed on any tenant if you **know the App ID.**

Generally, I've seen partners take two approaches to solve this. Most of them went with *»You can't really set up and use our apps without our consultants, so go ahead«*, partially because adding some sort of **licensing is overhead**. The other option was that partners implemented their **own monetization or licensing logic** that prevented you from using the functionality if you hadn't bought their license.

But with AppSource transactability, the overhead is now **taken care by Microsoft**. Keep in mind that currently **only a per-user plan is supported**. Each user that wants to have access to your app needs to have a license purchased. If you're using different pricing models, like *per app, per company, per number of invoices, ...* you're currently out of luck. Microsoft says they'll *work on **adding different models** depending on what the community needs*, but who knows when that will be.

<hr/>

### Everything works through entitlements

**Cloud** doesn't use license files, it **uses entitlements**, but the logic is still the same. If you don't have access to an object through entitlements, it **doesn't matter if you have SUPER permissions**. This picture illustrates it well. 

![Entitlements vs. Permissions](/images/entitlements/entitlement-vs-permission.png)

**Without the necessary entitlement**, the user won’t see the pages of your app and **won’t have permission** to manipulate the data. So let’s start with the entitlement object. The base and system apps define several different entitlements. But for us, we should pay attention to the following 4 types:
- PerOfferUserPlan
- Role - Delegated
- ApplicationScope – API.ReadWrite.All
- Unlicensed

<hr/>

### PerOfferUserPlan

This is the main entitlement type for monetization, it **maps to the license** users will buy through AppSource. 

![Gold Entitlement](/images/entitlements/entitlement-gold.png)

**Id** in this case is the **ServiceId** of the offer plan you create when creating the AppSource **submission**.

![Entitlements vs. Permissions](/images/entitlements/offer-plan-service-id.png)

**ObjectEntitlements** is where you **map a permission set to an entitlement**. This is how an entitlement defines the **maximum permissions** that can be assigned to a user holding this entitlement.

You can have **multiple PerUserOfferPlans** if you want to implement different license levels (*bronze, silver, gold*). Each of the lower plans would have a more restrictive permissions set attached to an entitlement, and that’s how you’d **control the level of access**.

<hr/>

### Delegated Admin entitlements

You **don’t have to implement these** entitlements, but without them, the **delegated admin users won’t have access** to your application objects and won’t be able to troubleshoot customers.

![Delegated Admin Entitlement](/images/entitlements/entitlement-admin.png)

There are **4 different delegated admin roles** currently available for BC:
- Delegated Admin Agent - *00000000-0000-0000-0000-000000000007*
- Delegated Helpdesk Agent - *00000000-0000-0000-0000-000000000008*
- Dynamics 365 Agent - *00000000-0000-0000-0000-000000000009*
- Delegated BC Admin Agent - *00000000-0000-0000-0000-000000000010*

The **IDs have to be exactly as specified above**, which relate to the actual role in Entra ID. My preference is to give all delegated roles full permissions, so they can access and troubleshoot any part of the application. You can however make it more restrictive by assigning a different permission set.

<hr/>

### ApplicationScope – API.ReadWrite.All

This is the entitlement that gets assigned to the **S2S API sessions with the API.ReadWrite.All Scope**. If an external application is integrating with Business Central using user impersonation/delegation authentication, the entitlements/permissions of the **impersonated users apply**. Nothing special there. However, if the client is using **Service-2-Service (S2S) authentication**, The following entitlement is assigned to it:

![API Entitlement](/images/entitlements/entitlement-api.png)

The **permissions for the S2S applications** are managed on the **Microsoft Entra Applications** page, but they follow the same rules as users. If the client **doesn’t have entitlements** for an object, it doesn’t matter if it has SUPER permissions, the **access is not granted**. So if your app is exposing any APIs and you want to support S2S, you should include this entitlement object and give it sufficient access, otherwise, a simple Ping API starts throwing permission errors:

![Ping API](/images/entitlements/ping-api.png)

![API Entitlement Error](/images/entitlements/entitlement-api-error.png)

<hr/>

### Unlicensed Entitlement

This is the entitlement object that gets **assigned if no others match**, meaning if the user doesn’t have a PerUserOfferPlan license, is not a delegated admin (or delegated admin entitlements are not defined), or is an S2S authenticated client and ApplicationScope entitlement isn’t defined.

![Unlicensed Entitlement](/images/entitlements/entitlement-unlicensed.png)

This one is primarily used for **side-by-side** functionality, meaning, when you **already have your monetization solution**, and you want to **move to AppSource monetization** without causing any issues for your existing customers. 

As soon as you **define a single entitlement object** in your code base and publish that version to AppSource, the **entitlement check starts being enforced**. So if you define a PerUserOfferPlan and release a new version, **all existing customers** that update the app **won't be able to use your app** anymore until they buy appropriate licenses through AppSource. This can be annoying, especially if they’ve already purchased a license through your own monetization model. Hence we implement a **side-by-side solution**, that will **allow customers to use the app normally while they’re transitioning** to the MS monetization model. More on the side-by-side in the next section.

If you have existing customers, the unlicensed entitlement should give all the access that the existing customers need (usually all available permissions). If you’re **creating a new app** without any existing customers, you can **skip the unlicensed entitlement** altogether.

<hr/>

### Side-by-Side

If you went down the route of creating your own monetization engine, you probably found **key areas** of your functionality and implemented a **license check** in those points. I common approach is to subscribe to the OnBeforeInsertEvent of a key table and check if the app is licensed.

![Check for license on Insert of a Table](/images/entitlements/license-check.png)

If this was your approach, you now have to **wrap these checkers in IsUnlicensed checks**.

![Check for license on Insert of a Table with IsUnlicensed](/images/entitlements/license-check-isunlicensed.png)

If a user has **purchased a license through AppSource**, they will have the corresponding **entitlement assigned** and the code will **skip the license check**. If they haven’t, they get the **Unlicensed entitlement** assigned and the code will **check with your monetization engine**. 

IsUnlicensed will return true if a user has **any other entitlement from the current app assigned**. If you’re planning to implement **multiple access levels** like *Gold, Silver, or Bronze*, you might sometimes want to direct your code flow in a direction only if the user has the appropriate entitlement level assigned. You can do that using the **IsEntitled** function. The name of the entitlement to check is the **entitlement object name**.

![Check for a specific entitlement](/images/entitlements/entitlement-check.png)

The important thing to note here is that **entitlements are completely ignored OnPrem** and **IsUnlicensed or IsEntitled will always return false**. So if you have any **automated tests** ensuring your monetization approach works, those **won’t work**. I’ve asked Microsoft what to do in this case, and they’re *discussing it*. Until they come up with an approach, it’s best to wrap the IsUnlicensed in an interface so that we can **mock it in tests**.

<hr/>

### Cross-app entitlement check

The final aspect of entitlements that we’ll take a look at is **checking for entitlements of a different app**. A scenario when you’d want this is if, for example, you’re offering three apps, **App A, App B, and App C**. They’re all standalone apps that work independently, however you want to give the users of App A the other two apps for free. If App B and C are **only checking for their own entitlements**, a user would need to **purchase three licenses**. However, if we implement a **cross-app check**, we can ensure that users with licenses for App A, also have access to the other two apps.
So if we refactor the above example

![Check for a specific entitlement with an Entitlement Manager](/images/entitlements/entitlement-check-manager.png)

Let’s say this DownloadEntries procedure is in App C. This is how the entitlement manager would look like:

![Check for entitlements across apps](/images/entitlements/entitlement-manager.png)

We check for either a Gold entitlement **in App C**, or a Gold entitlement **in App A** and either entitlement is enough for the check to pass. The next logical step here would now be to **move the entitlement manager to a separate app**, so we can manage all these app relationship combinations in a **central place**. But this was a quick example of how we can check if a user has an entitlement for a different app. The same applies to the IsUnlicensed function, it too can take a GUID parameter and we can check if a user has the Unlicensed entitlement for a different app.

<hr/>

Okay, this brings us to the end. I know this was quite a read, but as I was researching the topic of entitlements there were just **so many pieces missing** in the official documentation. I tried opening issues for it, I tried creating PRs to adjust the information, but there was no response from maintainers, so I decided to package all this information in a blog post. Partially for myself, for the next time, I have to deal with entitlements, but also for anyone else going down the same route.
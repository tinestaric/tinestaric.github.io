---
layout: post
title: "3 Pitfalls of Var Parameters"
date: 2024-01-10 08:00:00
comments: false
categories: al
image: /images/confused-dev.jpeg
---
I believe I don’t have to introduce the purpose of **var** in procedure parameters too much. If the parameter has a var modifier, it’s passed **by reference**, and any changes within the procedure will affect the variable that was passed into the procedure. If it doesn’t, it’s passed **by value**, meaning that any changes will stay local to that procedure. However, that’s not always the case. There are a couple of edge cases when it comes to var parameters, and as I was about to write the explanation for our internal learning purposes anyway, I decided to use this as an opportunity to make a debut in the world of blogging.

<hr/>

### Parameters that are always passed by reference
Recently I had a younger colleague struggle with passing a parameter to a function by reference. Now this wasn’t your average “you forgot a var somewhere in the signature”, but rather a List that was being passed in. The List parameter was not marked as var, yet **all the changes applied within the procedure also affected the instance of a List outside the procedure**. 

*Wait what? How come?* 

Well, a list, unlike your ordinary texts, integers or Booleans is a **reference type**, which means assigning it to a new variable or passing it to a method without var will create a separate variable that **writes to the same list**. 

![List value assignment when passed without var](/images/var-param-list.png)

It's actually quite well documented in the [docs][listdocs]:

![List pass-by-reference documentation](/images/var-param-list-doc.png)

But we're so used to the distinction that a non-var parameter is passed by value and we can manipulate it however we like, while var parameters are passed by reference, and changes will have an effect outside of the procedure.

And Lists are not alone, there are a couple of data types that are always passed **by reference**:
- Dictionary
- JsonObject
- JsonArray
- JsonValue
- JsonToken
- OutStream
- InStream
- Codeunit
- Interface
- ErrorInfo
- Notification
- Query
- TextBuilder

**Be careful** with these data types, you might get them back in a different state when the procedure finishes. This is especially true for **exposing them through events**, as we have no control if a subscriber can change the contents of the variable or not.

~~Var modifiers don't make a difference, but you should still use them to **signal the intentionality** of your procedure. If the procedure intends to modify the parameter, add a var in front of it, if it's only reading data, skip it.~~

This was actually not the full truth. Var **does make a difference**, even with reference parameters. You can read more about it here: [Reference parameters - var does matter][refparamvarmatters]

<hr/>

### Temporary records
If we do an Insert on a normal record, we write to the database. If the table is temporary, the record is only stored in memory. *Easy enough*. However, be careful when you’re creating methods that expect temporary records. As it turns out, if the parameter is a record that is passed by reference (has a var modifier), then **the "temporary" modifier has no effect**.

If you have a procedure that takes in a Customer record by reference and is marked as temporary:

``` csharp
procedure MyProcedure(var Customer: Record Customer temporary)
```

If you pass a non-temporary Customer record in, the record will **remain non-temporary**, and any record operations that MyProcedure is doing will actually make changes to the database.

Here’s how the records behave:

![IsTemporary behavior depending on var and temporary parameter modifiers](/images/var-param-temp-all.png)

If your procedures are making any **dangerous operations** on a pass-by-reference record, like **DeleteAll**, I highly suggest adding an **IsTemporary gatekeeper** at the beginning, either exiting or throwing a record if the record is not temporary.

Again, even though the temporary modifier does not affect the execution, keep using it for **signaling intentionality**. Are you expecting a temporary record? Mark the parameter as temporary.

<hr/>

### Streams and Blobs
Short fact, **streams don't hold data, blobs hold data**. So if you're trying to read information with a stream from a blob that no longer exists (because it was de-allocated from memory), the stream won't have anything to read from.

*Okay, but what does that have to do with passing parameters around by reference?*

Well, let's take a look at this simple example. 

![Read from a local blob with InStream](/images/var-param-stream-bad.png)

We have a blob that holds» Hello World« text, and that's what we should be able to read with an InStream. This is another example of *» This should work, why doesn't this work?«*.

And no, the answer is not *» because InStream is not passed by reference«*. As per our first point, streams are **always passed by reference.**

Again, **streams don't hold data**. You can think of streams as straws we use to drink. If you try to drink from a full cup, well, that will work, you'll drink. But now I'll take your cup, throw it away, and ask you to take another sip. *You can't, can you?* And that's exactly what's happening in the above example.

In the ImportFile procedure, we take our cup (Temp Blob), pour in a nice cold *Hello World*, and put in the straw we got as a parameter. But now as the procedure finishes, the local variables from our procedure get **de-allocated from memory**. As TempBlob is one of our local variables, we're now effectively left without our cup, drawing air through our straw, feeling sad.

These two options on the other hand will work just fine:

![Reading from a global blob with InStream](/images/var-param-stream-global.png)

![Reading from a parameter blob with InStream](/images/var-param-stream-param.png)

This time, as TempBlob is **not a local variable**, it doesn't get de-allocated, and the InStream can successfully read data from it. So just keep in mind, that **data source needs to still be available when you try to read from it** with an InStream, either as a global variable or by being passed as a parameter.

Note: **UploadIntoStream** works just fine, as the uploaded file is allocated outside of procedure scope:

![Read from UploadToInStream function with InStream](/images/var-param-stream-upload.png)

[listdocs]: https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/list/list-data-type

[refparamvarmatters]: /blog/2024/reference-parameters-var-does-matter/
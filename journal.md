# Journal

The first thing Readmarks does is attempt to load the readmark for the current domain.

So that's the first thing we should port, right?

What's the right idiom for that?

On the one hand, I'm not crazy about the UI being coupled to -- I mean driving -- the application logic. In my opinion,
since components are part of the DOM, which is really all about view, you shouldn't have to load a component to drive
what would in MVC be a controller action.

But I'm really not sure what it looks like otherwise... Something more like Angular?

Am I biasing towards MVC just because that's what I know?

It's possible. Let's go with Idiomatic React and find out.

So we'll drive the workflow and lifecycle using component events. That means that when App.js loads, it should
interrogate the current state, and decide what to do.

The current state will be empty. There's no Readmark loaded -- and we haven't yet attempted to read a Readmark.

Let's not worry about modeling those parts separately -- the current state of the Readmark is UNRESOLVED or similar.
Then we can drive the whole state machine from there.

So let's go to Redux first and configure some initial state.

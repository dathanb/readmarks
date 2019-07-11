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

# 2019-07-03

Sort of struggling still with embedding application logic in the components, which are fundamentally views.
What I'm thinking right now is that at least we can separate application logic into their own components.

So, e.g., in the case of loading the current readmark, we could have a base container do something like
<App>
    <ReadmarkProvider>
        <Readmark>
    </ReadmarkProvider>
</App>

And the ReadmarkProvider would load the current readmark and make it available to the nested component.

That way, at least those components get to be basically "pure".

Does this make sense, though?

At Udacity, we'd distinguish between "containers" and "components". `App` wouldn't really know that `Readmark` needed to
be nested inside a provider -- it'd just include a `ReadmarkContainer`, which would be responsible for loading an
appropriate readmark and passing it to the `Readmark` component.

Let's say that we end up with two contexts in which we'd render a Readmark -- e.g., showing the current readmark, and 
listing all readmarks. It might make sense to use the same presentational component in both cases. In either case, the
context of how to load the readmarks doesn't belong in the component, so the `App` would have to decide how the readmark
gets loaded -- either by composing the appropriate container, or by inserting an appropriate provider.

I'm not really sure which one's better. But I guess I have a small bias for the non-container version, because it also
allows reuse of the `ReadmarkProvider`, whereas the context-specific container version does not -- and any effort
to make that container version more reusable feels like it'd basically devolve to the provider / component version.

Plus, this is the approach that's recommended by <https://krasimirtsonev.com/blog/article/react-separation-of-concerns>,
which feels pretty right to me.

# 2019-07-05

One thing that I know from experience I'll eventually want is some way to export a set of "public" methods and data from
one component of the system for consumption by others. I don't think that exposing actions directly makes sense there --
I'd rather expose some sort of API.

I think we can have a set of blessed actions that are interpreted by the Redux store as API registrations. We register
those APIs at some point (at startup is the most obvious case), and then later on any component that wants to consume
those APIs just binds the appropriate state to a local prop. The APIs will all return promises, so you can invoke some
action and then register a handler for the result. If you want to wrap some action around a call to that API, it's
simple -- you send your own action, and the promise chain then calls the API, and when *that* promise resolves, you
dispatch the completed action.

WRT the Popup class, for testing outside the extension context, we'll be in our own domain. We can either register a 
readmark for that domain and just test with it -- or, more in line with dependency injection, we can pass in the domain
to resolve for.

But to future-proof a little bit for domains that might host more than one distinct thread we want to follow, let's
call it some kind of `Context` instead of "domain".

So the first thing we want to test is a component that'll load the domain from the URL and pass it to its child component.

Well, I guess the Popup is replaced by the index.js in this React-based version, right? As the root, it should resolve
the domain, and pass it to some component that just renders it.

Let's start with a component to render the readmark.

OK, that's super easy. But we have a few requirements:
1. Color the background red if we don't have a readmark
2. Color the background yellow if we have a readmark but it doesn't match the current url
3. Coplor the background green if we have a readmark and it matches the current url

How do we test these sorts of things?

I guess we could make sure that the readmark gets a particular id, and then we could render the component, find that id,
and make assertions about its style?

We could do a VCR-style thing, where we render the readmark in each context and ask for user verification, and save
non-volatile portions of the DOM for later comparison, and just fail the test if the comparison ever fails.

We could provide a test container that renders the component in all its various incarnations, that can be viewed by a 
user doing a manual test pass.

Or we could not worry about it, which is what I think I'm going to do for now.

OK, basic readmark is rendering. The colors are le suck, though, so going to fix that a little bit right now.

OK, done. Cribbed some styles from the old readmark app -- which really just means from Bootstrap, so I should probably
import Bootstrap at some point and start using its styles instead.

Things I want to expose as APIs that can get injected:
1. Context generation / calculation for readmarks
    - Can be by domain (initial default), or more complex (later)
2. Storage
    - Start with local storage
    - Also support bookmarks impl
    - And later, maybe a server somewhere
3. Chrome API
    - Depended on by the bookmarks storage driver, at minimum
4. Readmarks API
    - Depends on all the above.

How do APIs that aren't components (and therefore aren't rendered in the DOM) get access to APIs they depend on?
I guess if they're sending actions to register themselves in the Redux state for others to consume, then a given API
can just listen for actions that register its dependencies, and save them accordingly.
    - In the API's namespace within the redux state?
    - Or internally?
    - I guess it depends on how hard it is to hook as a listener into the actions.
    
OK, I have the readmark display component working. So what's the next step?

I guess the next step would be to feed it the current tab's URL. Which means I need a component to grab that. And since 
I don't want to do a ton of manual testing, means it's time to start testing.

The Chrome API isn't available in test, so we'll have to mock it.

Actually, we'll be exposing the subset of the Chrome API that we want to use via some facade that does exactly what we
want. So we'll test those pieces separately -- the component that loads the URL and provides it to its children, and the
API that actually communicates with Chrome to load the current tab's URL.

Let's work on the latter initially -- it's already written, and we just need to refactor a little to be friendly to this
usage pattern, and write some tests.

# 2019-07-07

OK, I have the ChromeApi refactored. I'm not sure how much it's worth trying to test it outside of Chrome right now,
so for now I'm just going to move on.

So the next piece I've identified is the component that resolves the current tab url and passes it to its child
component.

That piece of logic depends on the chrome api -- we have to interrogate the current tab for its url. But rather than
integrating with the chrome api independently, I think that context is probably best abstracted behind an API (or, 
eventually, multiple APIs) that defines the sorts of operations Readmarks performs, and exposes implementations of them.

So that's the next thing -- ReadmarksApi?

Why wouldn't we just use the ChromeApi class directly? It's not likely that I'll rewrite this for Firefox, so abstracting
away the browser doesn't make sense. And if we want to substitute in a mock version, it's just as easy to inject a mock
of the ChromeApi as the ReadmarksApi.

The only reason I can think of is that the ChromeApi includes both tab methods and bookmark methods -- and while the
API for interrogating the current tab isn't something we're likely to want a second implementation of, the CRUD API for
readmarks *is* something we're likely to want multiples of (bookmarks, local storage, remote storage). So depending
directly on the chrome api for tab methods feels like we're going to depend directly on it for the bookmarks methods, too,
and while it might be the right level of abstraction for the former, it's the wrong for the latter.

Does that mean I should just be disciplined about not using the bookmark methods? Or does some hiding make sense?

I think it makes sense to have a highly cohesive API for readmarks -- get the current context, get the readmark
for the current context, save a readmark for the current context. So let's go ahead and do that.

# 2019-07-08

OK, I'm waffling on the API idea. Does it make sense to have an API like that? Or should the coponents just dispatch
actions directly?

I kinda think that it does still make sense to have the API, though, because the thing about actions is that they have 
a lifecycle, and if there are any actions that are internal to the API, we want them to get fired, but it doesn't make
sense for the components to be responsible for firing them at the right time with the right payload, etc.

And invoking API methods via actions seems weird, because of the loose coupling -- when do you know that the API is
completely done? I think we'd have to resort to something like passing the API an action payload to dispatch when *it's*
done, which seems like too much ceremony -- and a step backward, since we have promise chains now.

Anyway, I guess actions are scoped to the UI, right? So if the UI needs to respond to something, that lifecycle is driven
by actions. So we'd do something like

```
dispatch(someAction).
    then(someApiCall).
    then(dispatch(someActionCompleted).
    catch(dispatch(someError))
```

Let's just run with that -- it'll prolly be fine, and if not, it'll be a learning experience.

# 2019-07-10

OK, so loading the current readmark works fine.

Now I want to add a "load readmark" button to navigate to the readmark for the current context.

The challenge, though, is that those buttons don't need to be part of the `CurrentReadmark` component, and currently
there's no way for the `CurrentReadmark` component to pick up on the fact that the url has changed, or that the readmark
for the current context has changed.

So it's time to bring Redux into the mix, I think.

What we don't want to do, though, is to have CurrentReadmark send some action when it loads the readmark, and also have
the LoadReadmark and SaveReadmark buttons have to dispatch the same action. That's pushing too much responsibility onto
the client of the API.

Instead, `ReadmarksApi` should dispatch those actions whenever the relevant methods are called. And so `CurrentReadmark`
component doesn't even need to handle the action dispatches itself -- it just calls the `ReadmarkApi#loadCurrentReadmark`
method, which will handle making sure the right actions get dispatched.

So the first step is to expose Redux to the `ReadmarksApi` so it can actually dispatch those actions.

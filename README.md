# ReadMarks

More like physical bookmarks than the way we usually use online bookmarks.

## TODO

1. Rewrite Chrome extension in React
2. Publish to Chrome store 
    - Can I do this privately? I don't really want other people to use it, I just want Chrome to not
   bug me about unpacked extensions being unsafe.
    - Yep, looks like i can publish to tester accounts. So I publish to the store, and then set my own Google account as
      the whitelisted tester account, and then only I get to see it. Woot!
3. Add server-side support? 
    - Not really sure what that would get me, other than portability.
    - I guess it would allow me to add content that doesn't store well in just bookmarks, and make sure that data is
      durable. e.g., annotations about equivalence of some domains (some comics publish to both www.somecomic.com and
      just somecomic.com, and we don't want to accidentally end up with two readmarks.). We could save that in local
      storage, but then it doesn't get synced (does it?), and it can get deleted easily
    - I'll punt on this until I have a concrete use case for it. As long as I'm the only user, I can basically use the
      code as a DB, and put all the config I want there. As long as I keep it in JSON and not hardcoded, it should be
      easy enough to port to some DB later.


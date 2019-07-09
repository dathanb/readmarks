# ReadMarks

More like physical bookmarks than the way we usually use online bookmarks.

# Development

To develop on the extension,

1. run `npm run build`
2. From Chrome, load the `build/` directory as an unpacked extension
3. To iterate on it, run `npm run watch` to get auto-building

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
4. Support navigation for known blogs, comics, etc.
    - For, e.g., Medium accounts, where there aren't "previous" and "next" links available on the page, it's
      inconvenient to navigate to the next-most-recent article by a given author via the web interface.
    - So a "next" button would be really handy for consuming my favorite Medium feeds. (Actually, I barely read Medium,
      precisely because I like to find authors I really like and then follow them and read their stuff exhaustively, and
      Medium makes that hard.)
    - However, it might be possible to programmatically determine what's the next-most-recent article by a user, and
      then navigate to it.
      - At minimum, Medium publishes RSS feeds for authors, and the app could consume that -- so at least reading
        incrementally through the author's latest content would be straightforward.
    - Looks like it's doable: http://pocketproduct.com/2016/medium-index/

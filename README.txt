TinyJSModule ===================================================

This is a re-impelementation of CommonJS, but it uses ES3 for
some reason. Please, I beg you, don't ask any questions. Though,
there are some changes:

 * __name: This variable gives you the name of the module that
   you're currently in. Actually kinda useful.

 * __dirname: self-explanatory

Project FAQ ====================================================

    Q: Will you release this project on GitHub?
    A: Probably not. One of the reasons is that random kids on
       the internet will steal this project if they find it.

    Q: What's the problem with kids stealing your code?
    A: The problem is that I do not like when people remove all
       mentions of the original project and release it as their
       own, but minification does not count and forks are fine.

    Q: Will random kids on the internet steal this?
    A: Reasonably, probably not since they're not interested
       in this project and its very specific use case.

    Q: How do I bundle up my project?
    A: use the bundle.js thing idk

    Q: Should I use a JavaScript minifier on my bundle?
    A: Yes, you should.


Changelog ======================================================

   v1.0 - Make the basics of the module system

   v1.1 - Patch: Remove regex's /u flag so that it's ES3-
          compatible.
   
   v1.2 - Increase the sample project's complexity and finally
           add directory support

OK, thanks for reading this.
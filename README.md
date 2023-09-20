# One Page Scroll by André Morais for Synertics
A way of creating section on your website.
I created this because the One Page Scroll 1.3.1 by Pete R. doesn't support Hotjar. Pete's framework doesn't use scrolls to work which are required by Hotjar.

It requires jQuery (1.9.0 or later).

## Demo

Just clone the repository and run the index.html. It's also an example of how to use it.

## Basic Usage
To add this to your website, simply include the latest jQuery library together with `one-page-scroll.js` and `one-page-scroll.css` into your document's `<head>` and call the function as follows:

```html
<body>
  ...
    <section>...</section>
    <section>...</section>
    ...
  ...
  <script>
    var ops = OnePageScroll();
  </script>
</body>
```

You can navigate to specific section by calling ('1' is referring to the first section):
```js
    var ops = OnePageScroll();
    ops.navigate_to(1);
```

### Considerations
This won't be the final version (probably).
# Chrome Blank 2nd Canvas Bug

See index.html for more information.

Chrome is yielding a blank 2nd canvas. Sometimes this doesn't happen on the very first page load, but it then happens every time if I reload (sometimes might take several reloads to trigger).

I am seeing this on Mac OS X 10.14.6 running Chrome 77.0.3865.90 and Canary 79.0.3928.3.

I do not know if this matter, but in Mac OS X 10.14.6 and Canary 79.0.3928.3 I see the following errors from Chrome when it run it via the terminal:

```
[54393:775:1002/135502.979947:ERROR:shared_image_backing_factory_gl_texture.cc(812)] CreateSharedImage: invalid size
[54393:775:1002/135502.980030:ERROR:shared_image_factory.cc(416)] CreateSharedImage: could not create backing.
[54393:775:1002/135502.980109:ERROR:shared_image_stub.cc(165)] SharedImageStub: Unable to create shared image
```

If I run Canary with the `--disable-gpu` flag then this page always loads fine and I don't see the error message either, e.g., via `/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --disable-gpu`.

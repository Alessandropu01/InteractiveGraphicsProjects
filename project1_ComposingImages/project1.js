// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
  var bgData = bgImg.data;
  var fgData = fgImg.data;
  var width  = bgImg.width;
  var height = bgImg.height;

  for (var y = 0; y < fgImg.height; y++) {
    for (var x = 0; x < fgImg.width; x++) {
      
      var bgX = fgPos.x + x;
      var bgY = fgPos.y + y;
      var bgIndex = (bgY * width + bgX) * 4;
      var fgIndex = (y * fgImg.width + x) * 4;

      if (bgX >= 0 && bgX < bgImg.width && bgY >= 0 && bgY < bgImg.height) {
        var alpha = fgData[fgIndex + 3] * (fgOpac / 255);
        var beta = 1 - alpha;

        bgData[bgIndex] = Math.round(alpha * fgData[fgIndex] + beta * bgData[bgIndex]);
        bgData[bgIndex + 1] = Math.round(alpha * fgData[fgIndex + 1] + beta * bgData[bgIndex + 1]);
        bgData[bgIndex + 2] = Math.round(alpha * fgData[fgIndex + 2] + beta * bgData[bgIndex + 2]);
        bgData[bgIndex + 3] = Math.round(fgData[fgIndex + 3] + beta * bgData[bgIndex + 3]);
      }
    }
  }
}

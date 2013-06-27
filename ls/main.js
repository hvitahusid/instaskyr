$(function(){
  var instafeed;
  instafeed = new Instafeed({
    clientId: '3d26c3c843b34294954a8a0abbf9a1d0',
    get: 'tagged',
    tagName: 'skyris',
    mock: true,
    limit: 60,
    success: function(data){
      var feed, i$, ref$, len$, item, caption, e, _from, this$ = this;
      feed = [];
      for (i$ = 0, len$ = (ref$ = data.data).length; i$ < len$; ++i$) {
        item = ref$[i$];
        try {
          caption = item.caption.text.split(/\ #|#/).join(' #').replace(/ +/g, " ");
        } catch (e$) {
          e = e$;
          caption = '';
        }
        try {
          _from = item.caption.from.full_name;
        } catch (e$) {
          e = e$;
          _from = '';
        }
        feed.push({
          link: item.link,
          from: _from,
          thumb: item.images.low_resolution.url,
          caption: caption
        });
      }
      return dust.render("feed", {
        feed: feed
      }, function(err, out){
        return $('#feed').html(out);
      });
    }
  });
  instafeed.error = function(){
    try {
      return instafeed.run();
    } catch (e$) {}
  };
  try {
    return instafeed.run();
  } catch (e$) {}
});
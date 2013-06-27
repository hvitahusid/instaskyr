$ ->
    instafeed = new Instafeed do
        clientId: '3d26c3c843b34294954a8a0abbf9a1d0',
        get: 'tagged',
        tagName: 'skyris',
        mock: true,
        limit: 60,
        success: (data) ->
            feed = []
            for item in data.data
                # Make sure there are spaces between tags and remove multiple spaces:
                try
                    caption = item.caption.text.split(/\ #|#/).join(' #').replace(/ +/g, " ")
                catch
                    caption = ''

                try
                    _from = item.caption.from.full_name
                catch
                    _from = ''

                # Append relative data to feed for template:
                feed.push do
                    link: item.link
                    from: _from
                    thumb: item.images.low_resolution.url
                    caption: caption

            dust.render "feed", {feed: feed}, (err, out) ~>
                $('#feed').html(out)

    instafeed.error = ->
        try
            instafeed.run()

    try
        instafeed.run()
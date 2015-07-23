       ___                              _           _ _   _ 
      / __\__ _ _ __  _ __   ___  _ __ | |__   __ _| | | / \
     / /  / _` | '_ \| '_ \ / _ \| '_ \| '_ \ / _` | | |/  /
    / /__| (_| | | | | | | | (_) | | | | |_) | (_| | | /\_/ 
    \____/\__,_|_| |_|_| |_|\___/|_| |_|_.__/ \__,_|_|_\/   
                                                        

The cannonball client is a javascript library that is a simple wrapper for
making HTTP requests to the Cannonball server. It is written in pure JavaScript
with no use of dependencies to keep it simple to use.

This repository can be loaded as a bower dependency.

This library can also be included using a `<script>` or with CommonJS and AMD
Module loaders.

```
bower install git@github.com:paperg/cannonball-client
```

#####Basic Usage and API

In order to prevent the server from processing too much logic, we have moved
a majority of the heavy lifting to the front end.  This makes each client do
the processing and frees up our server to just send the request.

Instantiate the library as follows:

```
	var metrics = new Metrics('cannonball-server-address.paperg.com')

	// endpoints
	metrics.count('my.super.cool.value') // { my.super.cool.value: '-1|c' }
	metrics.increment('my.super.cool.value') // { my.super.cool.value: '1|c' }
	metrics.decrement('my.super.cool.value') // { my.super.cool.value: '-1|c' }

	metrics.gauge('my.super.cool.gauge') // { my.super.cool.gauge: '200|c' }
	metrics.gauge('my.super.cool.gauge') // { my.super.cool.gauge: '-2|c' }

	metrics.timer('my.super.cool.timer') // { my.super.cool.timer: '382|ms' }
```


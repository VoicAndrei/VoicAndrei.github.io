#!/usr/bin/env python3
"""Local preview server that mirrors GitHub Pages' extensionless URLs.

GitHub Pages serves /blog/camera-story from blog/camera-story.html, but
python3 -m http.server does not. Use this instead so local links behave
like production:

	python3 serve.py 8123
"""

import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class CleanURLHandler(SimpleHTTPRequestHandler):
	def translate_path(self, path):
		local_path = super().translate_path(path)
		if not os.path.exists(local_path) and os.path.isfile(local_path + '.html'):
			return local_path + '.html'
		return local_path


def main():
	port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
	root = os.path.dirname(os.path.abspath(__file__))
	handler = partial(CleanURLHandler, directory=root)
	with ThreadingHTTPServer(('', port), handler) as httpd:
		print(f'Serving {root} on http://localhost:{port}/')
		httpd.serve_forever()


if __name__ == '__main__':
	main()

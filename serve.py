import http.server
import socketserver
import webbrowser
import os

# Set the port
PORT = 8000

# Change directory to the current directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create the HTTP server
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Serving at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

# Open the default web browser
webbrowser.open(f"http://localhost:{PORT}")

# Start the server
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped by user")
    httpd.server_close() 
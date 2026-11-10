@echo off
node .scripts\scan-docs.mjs
node .scripts\overview.mjs
node .scripts\sync-site.mjs
node .scripts\asset-sync.mjs --lenient

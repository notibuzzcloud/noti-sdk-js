# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-12-17

### Changed
- Synchronized SDK with latest Bridge API changes
- Removed deprecated endpoints: `chatsArchive`, `chatsUnarchive`, `chatsUnread`
- Removed standalone `sendList` endpoint (now handled via `sendMessage` with type 'list')
- Updated documentation: translated `endpoints.md` to English

### Fixed
- SDK now matches Bridge API implementation exactly
- `sendList` functionality properly integrated into `sendMessage` endpoint

## [1.0.0] - 2025-12-17

### Added
- Initial release
- Complete TypeScript SDK for Noti Sender Bridge
- Support for all Bridge endpoints:
  - Sessions management
  - Profile management
  - Chatting (text, image, file, voice, video, poll, location, contact, forward, list)
  - Status/Stories (text, image, voice, video, delete)
  - Chats management (overview, messages, read, edit, pin, unpin)
  - Contacts management
- Bulk messaging support with anti-ban controls
- Async message queuing
- Campaign control (stop, resume, availability check)
- Comprehensive documentation
- Examples for common use cases

### Features
- Full TypeScript support with type definitions
- ESM native module
- Async/await support
- Error handling
- Request/response type safety


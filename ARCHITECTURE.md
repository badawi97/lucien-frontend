# Lucien Frontend Architecture

## Architecture Principles
- Clean Architecture
- ABP-inspired modular design
- SOLID principles
- Separation of Concerns
- Enterprise scalability

## Folder Structure
src/
├── core/
├── shared/
├── features/
├── layouts/
├── services/
├── guards/
├── interceptors/
├── models/
├── permissions/
├── localization/

## Layers

### Core
Authentication, interceptors, guards, global services.

### Shared
Reusable components, directives, pipes, utilities.

### Features
Business modules:
- Users
- Roles
- Permissions
- Workflow
- Documents

### Services
API communication only.

## Design Rules
- Components handle UI.
- Services handle business/API logic.
- DTOs for all backend communication.
- Permission-driven UI.
- Localization-ready UI.

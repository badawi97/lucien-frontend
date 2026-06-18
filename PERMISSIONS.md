# Lucien Permission Standards

## Philosophy

Permission-driven UI.

Never rely only on hidden buttons.

Backend must enforce permissions.

## Naming Convention

Users.Create
Users.Edit
Users.Delete
Users.View

Roles.Create
Roles.Edit
Roles.Delete

Workflow.Approve
Workflow.Reject
Workflow.Return

Documents.Create
Documents.Edit
Documents.Delete
Documents.Download

## Angular Usage

Use permission service:

can('Users.Create')

Example:

@if(permissionService.can('Users.Create')){
  <button>Create</button>
}

## Backend

Every endpoint must validate permission.

## Future Rule

All new modules must define:
- View
- Create
- Edit
- Delete

permissions at minimum.

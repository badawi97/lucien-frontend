# Lucien API Standards

## General Rules

Frontend communicates only through services.

## Service Pattern

Methods:
- getList()
- get()
- create()
- update()
- delete()

## DTO Standards

Request:
- CreateUserDto
- UpdateUserDto

Response:
- UserDto
- PagedResultDto<T>
- LookupDto

## Error Handling

Handle:
- 400
- 401
- 403
- 404
- 409
- 500

## Authentication

Support:
- JWT
- Refresh Token
- Cookie Authentication

## API Versioning

Preferred:
/api/v1/users

## Pagination

Use:
PagedResultDto<T>

Fields:
- items
- totalCount

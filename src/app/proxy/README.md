# API Layer

The API layer is organized by backend endpoint group:

```text
users/
  models/
  services/
  index.ts
```

Use feature imports from application code:

```ts
import { UsersService, UserDto } from 'src/app/proxy/users';
```

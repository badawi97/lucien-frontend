import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {
  DataTableAction,
  DataTableActionClick,
  DataTableColumn,
  DataTableComponent,
} from '../../../../../../shared/components/data-table';
import { RolesService, UsersService } from '../../../../../../proxy/api/api';
import { CreateUserDto, RoleDto, UpdateUserDto, UserDto } from '../../../../../../proxy/model/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule, InputTextModule, DataTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly rolesService = inject(RolesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly users = signal<UserDto[]>([]);
  readonly roles = signal<RoleDto[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly dialogVisible = signal(false);
  readonly selectedUser = signal<UserDto | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly formErrorMessage = signal<string | null>(null);
  readonly isEditMode = computed(() => Boolean(this.selectedUser()?.id));
  readonly dialogTitle = computed(() => (this.isEditMode() ? 'Update User' : 'Add User'));

  readonly columns: readonly DataTableColumn<UserDto>[] = [
    { field: 'userName', header: 'Username', sortable: true },
    { field: 'firstName', header: 'First Name', sortable: true },
    { field: 'lastName', header: 'Last Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'phone', header: 'Phone' },
    { field: 'role.name', header: 'Role', sortable: true },
  ];

  readonly actions: readonly DataTableAction<UserDto>[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'pi pi-pencil',
      severity: 'secondary',
    },
  ];

  readonly form = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    userName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
    phone: ['', [Validators.maxLength(50)]],
    address: ['', [Validators.maxLength(500)]],
    password: ['', [Validators.minLength(6)]],
    roleId: [''],
  });

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.usersService
      .apiUsersGet(undefined, undefined, undefined, undefined, undefined, 0, 1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess === false) {
            this.users.set([]);
            this.errorMessage.set(response.message ?? 'Unable to load users.');
            return;
          }

          this.users.set(response.data?.items ?? []);
        },
        error: (error: unknown) => {
          console.error('Failed to load users.', error);
          this.users.set([]);
          this.errorMessage.set('Unable to load users. Please refresh or try again later.');
        },
      });
  }

  loadRoles(): void {
    this.rolesService
      .apiRolesGet(undefined, 0, 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.isSuccess === false) {
            this.roles.set([]);
            return;
          }

          this.roles.set(response.data?.items ?? []);
        },
        error: (error: unknown) => {
          console.error('Failed to load roles.', error);
          this.roles.set([]);
        },
      });
  }

  openCreateDialog(): void {
    this.selectedUser.set(null);
    this.form.reset();
    this.form.controls.password.addValidators(Validators.required);
    this.form.controls.password.updateValueAndValidity();
    this.formErrorMessage.set(null);
    this.dialogVisible.set(true);
  }

  openEditDialog(user: UserDto): void {
    this.selectedUser.set(user);
    this.form.reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      userName: user.userName ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      address: user.address ?? '',
      password: '',
      roleId: user.roleId ?? '',
    });
    this.form.controls.password.removeValidators(Validators.required);
    this.form.controls.password.updateValueAndValidity();
    this.formErrorMessage.set(null);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
    this.formErrorMessage.set(null);
  }

  onTableAction(event: DataTableActionClick<UserDto>): void {
    if (event.action.id === 'edit') {
      this.openEditDialog(event.row);
    }
  }

  saveUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const selectedUser = this.selectedUser();
    const formValue = this.form.getRawValue();
    const request$ = selectedUser?.id
      ? this.usersService.apiUsersIdPut(selectedUser.id, this.buildUpdateUserDto(selectedUser.id, formValue))
      : this.usersService.apiUsersPost(this.buildCreateUserDto(formValue));

    this.saving.set(true);
    this.formErrorMessage.set(null);

    request$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.saving.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess === false) {
            this.formErrorMessage.set(response.message ?? 'Unable to save user.');
            return;
          }

          this.dialogVisible.set(false);
          this.loadUsers();
        },
        error: (error: unknown) => {
          console.error('Failed to save user.', error);
          this.formErrorMessage.set('Unable to save user. Please review the details and try again.');
        },
      });
  }

  private buildCreateUserDto(formValue: UserFormValue): CreateUserDto {
    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      userName: formValue.userName,
      email: formValue.email,
      phone: formValue.phone || null,
      address: formValue.address || null,
      password: formValue.password,
      roleId: formValue.roleId || null,
    };
  }

  private buildUpdateUserDto(id: string, formValue: UserFormValue): UpdateUserDto {
    const input: UpdateUserDto = {
      id,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      userName: formValue.userName,
      email: formValue.email,
      phone: formValue.phone || null,
      address: formValue.address || null,
      roleId: formValue.roleId || null,
    };

    if (formValue.password) {
      input.password = formValue.password;
    }

    return input;
  }
}

interface UserFormValue {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  roleId: string;
}

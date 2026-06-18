# Git Workflow

## Branch Strategy

main
develop
feature/*
bugfix/*
hotfix/*

## Naming

feature/user-management

feature/workflow-dashboard

bugfix/login-issue

## Commit Format

feat: add user management

fix: resolve login issue

refactor: simplify permission service

docs: update architecture

## Pull Requests

Before merge:
- Build passes
- Tests pass
- No lint errors
- Reviewed

## Rule

Never commit:
- Secrets
- API keys
- Passwords
- Environment files

# OMEGA AI — Engineering Rules

> These rules are binding for all phases of OMEGA AI development. They are extracted from [OMEGA_CONSTITUTION.md](OMEGA_CONSTITUTION.md) and [NEXT_PHASE.md](NEXT_PHASE.md) and consolidated here as the single authoritative reference.

Last updated: 2026-06-16

---

## Numbered Engineering Rules

1. **Never redesign architecture.** The layered architecture (Domain → Adapter → Service → UI) is fixed. Work within it.
2. **Never rewrite completed work.** Extend, alias, or wrap — never replace a completed phase's deliverables.
3. **Never merge a failing pipeline.** All four commands (`npm install`, `npm run lint`, `npm run test`, `npm run build`) must pass before any MR is merged.
4. **Never suppress TypeScript errors.** Fix the root cause. If a type is missing, define it.
5. **Never bypass tests.** Do not use `eslint-disable`, `@ts-ignore`, or `any` to paper over failures.
6. **Never use `any` to hide contract problems.** If a type is unknown, define a proper interface.
7. **Never tightly couple providers.** All external integrations go through typed adapter interfaces.
8. **Never break existing interfaces.** Existing exported symbols must not be renamed or removed. Use aliases.
9. **Never sacrifice stability for speed.** A slower, correct implementation is always preferred.
10. **Always preserve backward compatibility.** New code must not break existing callers.
11. **Always update documentation.** Every phase must update `CHANGELOG.md`, `NEXT_PHASE.md`, and relevant `docs/`.
12. **Always update NEXT_PHASE.md.** The handoff document must reflect the current state after every phase.
13. **Always leave the repository healthier than found.** Each pass must improve lint, test, type safety, or documentation.
14. **TradingView must remain OPTIONAL.** OMEGA must function completely without TradingView. Never make TradingView a hard dependency.
15. **Mock adapters are the canonical source of truth.** HTTP adapters must implement the same interface as their mock counterpart. See [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md).

---

## Phase Discipline Rules

These rules govern how phases are executed:

- **Never implement Phase N+1 work during Phase N.** Each phase has a defined scope. Stay within it.
- **Never redesign a completed phase.** If a gap is found, close it with a targeted pass (e.g., Phase 7A Stabilization), not a redesign.
- **Never break canonical contracts.** The interfaces in `adapters/`, `lib/contracts/`, and `lib/persistence/` are canonical. Extend them; never replace them.
- **Never bypass TypeScript strict mode.** All code must compile cleanly with zero TypeScript errors.
- **Never use `any`.** Define proper types. If a type is genuinely unknown, use `unknown` and narrow it.
- **Never tightly couple TradingView.** TradingView integration must always be behind `isTradingViewEnabled()`.
- **TradingView must remain optional.** Every TradingView-related component must render a graceful `EmptyState` when disabled.
- **Mock-first.** All new features start as mock implementations. Real integrations come later, behind the same interface.
- **Interface-first.** Define the contract before the implementation.
- **Preserve backward compatibility.** Never rename exported symbols. Use type aliases.
- **Keep commits focused.** One logical change per commit. Reference the phase and part in the commit message.

---

## DO NOT IMPLEMENT (from OMEGA_CONSTITUTION.md)

The following are explicitly out of scope until the designated phase:

- Real Broker APIs (Phase 13+)
- Real Exchange APIs (Phase 14+)
- Real TradingView APIs (Phase 9A+)
- Real Market Data (Phase 10+)
- Authentication (Phase 15+)
- Secrets Management (Phase 15+)
- Background Workers (Phase 15+)
- Real AI Providers (Phase 11+)
- Production Database (Phase 15+)
- Autonomous Live Trading (Never without full safety stack)
- Risk Engine (Phase 13+)
- Production WebSockets (Phase 15+)
- Real Financial Transactions (Never without full safety stack)

---

## DO IMPLEMENT (from OMEGA_CONSTITUTION.md)

The following are always in scope:

- Domain models (types, interfaces, enums)
- Mock implementations
- State machines
- Event definitions
- Frontend placeholders
- Tests
- Documentation

---

## Code Quality Standards (from OMEGA_CONSTITUTION.md)

1. **TypeScript** — Strict mode enabled. Zero errors required.
2. **Testing** — All tests must pass. Aim for meaningful coverage of new code.
3. **Linting** — ESLint with strict rules. Zero lint errors required.
4. **Documentation** — JSDoc comments on all public APIs and exported functions.
5. **Naming** — Clear, descriptive names. No abbreviations unless universally understood.
6. **Structure** — Organized by domain. Follow existing folder conventions.
7. **No Duplication** — DRY principle. Extract shared logic into utilities.
8. **Error Handling** — Explicit error handling. No silent failures.

---

## Commit Guidelines

- Write concise commit messages focused on "why" rather than "what".
- Reference the phase and part: e.g., `Phase 7 Completion Pass: add ENABLE_TRADINGVIEW umbrella flag`.
- Stage by explicit path. Never use `git add -A` or `git add .`.
- Review `git diff --staged` before committing.
- Never force push (except rebase with backup branch).
- Never commit secrets, credentials, or `.env` files.

---

## References

- [OMEGA_CONSTITUTION.md](OMEGA_CONSTITUTION.md) — Mission, philosophy, full constraint list
- [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md) — All canonical contract surfaces
- [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) — ADR log
- [NEXT_PHASE.md](NEXT_PHASE.md) — Current phase status

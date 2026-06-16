# OMEGA AI Constitution

## Mission

Omega AI is an autonomous multi-market trading intelligence platform designed to analyze market conditions, generate trading signals, validate decisions, execute paper trades, and learn from results without autonomous live trading.

## Philosophy

1. **Safety First** - No autonomous live trading. All decisions are validated and logged.
2. **Transparency** - All reasoning is documented and explainable.
3. **Learning** - The system learns from paper trading results and market events.
4. **Modularity** - Each domain is independent and can be tested separately.
5. **Mock-First** - All implementations start as mock, then integrate with real backends.
6. **Interface-Driven** - Contracts are defined before implementation.
7. **No Breaking Changes** - Incremental development only.
8. **Testable** - All code is testable with comprehensive test coverage.

## Core Principles

### 1. Domain-Driven Design
- Each domain (Market, Trading, Strategy, Portfolio, etc.) is self-contained
- Domains communicate through well-defined interfaces
- No circular dependencies between domains

### 2. State Machines
- All entities have explicit state machines
- Valid transitions are defined upfront
- Invalid transitions are rejected

### 3. Event-Driven Architecture
- All significant events are published
- Event handlers can react to events
- Event history is maintained for audit trails

### 4. Mock-First Development
- All implementations start as mock
- Mock implementations use realistic data
- HTTP adapters are shells until backend is ready
- Configuration determines mock vs HTTP

### 5. No Autonomous Live Trading
- Paper trading only for validation
- All live trading decisions require human approval
- TradingView is used for testing and validation only
- No real financial transactions

### 6. Continuous Learning
- System learns from paper trading results
- Market events are analyzed for patterns
- AI accuracy is tracked and improved
- User feedback is incorporated

## Core Feedback Loop

```text
Knowledge
↓
Market Intelligence
↓
AI
↓
SignalFlow
↓
Paper Trading
↓
Analytics
↓
Experience
↓
Knowledge
```

New features must integrate into the existing OMEGA feedback loop. Parallel decision pipelines are prohibited. SignalFlow remains the central orchestration system.

## OMEGA Core Rule

Every future feature must strengthen the existing feedback loop. SignalFlow remains the central orchestration system. Parallel decision systems are prohibited.

## OMEGA Experience Rule

OMEGA improves through accumulated experience. OMEGA does not retrain AI models. Experience updates knowledge. Knowledge improves AI context. AI improves SignalFlow. SignalFlow improves paper trading. Paper trading generates new experience.

## Architecture Layers

### 1. Domain Layer
- Types, interfaces, enums
- State machines
- Event definitions
- No business logic

### 2. Adapter Layer
- Mock adapters (default)
- HTTP adapters (shells)
- Configuration-driven selection
- Fallback support

### 3. Service Layer
- Business logic
- Domain orchestration
- Event publishing
- State management

### 4. UI Layer
- React components
- Mock data visualization
- User interactions
- No backend calls

## Development Workflow

1. **Define Domain** - Create types, enums, state machines
2. **Create Mock** - Implement mock adapter with realistic data
3. **Add Tests** - Comprehensive test coverage
4. **Create Shell** - HTTP adapter shell (disabled by default)
5. **Document** - Update architecture and API docs
6. **Integrate** - Connect to other domains
7. **Validate** - Ensure no breaking changes

## Success Criteria

- All tests passing
- No breaking changes
- Comprehensive documentation
- Mock implementations realistic
- State machines valid
- Events properly defined
- Code is maintainable
- Architecture is clear

## Future Phases

### Phase 7: Backend Skeleton
- Create backend API endpoints
- Implement real data sources
- Connect HTTP adapters
- Add authentication

### Phase 8: Real Data Integration
- Connect to real market data providers
- Implement real broker APIs
- Add real portfolio management
- Implement real paper trading

### Phase 9: AI System
- Implement real AI models
- Add machine learning
- Implement prediction engine
- Add learning system

### Phase 10: Production Ready
- Performance optimization
- Security hardening
- Monitoring and logging
- Disaster recovery

## Constraints

### DO NOT IMPLEMENT
- Real Broker APIs (Phase 8+)
- Real Exchange APIs (Phase 8+)
- Real TradingView APIs (Phase 8+)
- Real Market Data (Phase 8+)
- Authentication (Phase 7+)
- Secrets Management (Phase 7+)
- Background Workers (Phase 7+)
- Real AI Providers (Phase 9+)
- Production Database (Phase 7+)
- Autonomous Live Trading (Never)
- Risk Engine (Phase 8+)
- Production WebSockets (Phase 7+)
- Real Financial Transactions (Never)

### DO IMPLEMENT
- Domain models (types, interfaces, enums)
- Mock implementations
- State machines
- Event definitions
- Frontend placeholders
- Tests
- Documentation

## Code Quality Standards

1. **TypeScript** - Strict mode enabled
2. **Testing** - Minimum 80% coverage
3. **Linting** - ESLint with strict rules
4. **Documentation** - JSDoc comments on all public APIs
5. **Naming** - Clear, descriptive names
6. **Structure** - Organized by domain
7. **No Duplication** - DRY principle
8. **Error Handling** - Explicit error handling

## Team Guidelines

1. **Commit Messages** - Clear, descriptive, reference phase/part
2. **Pull Requests** - One feature per PR
3. **Code Review** - All code reviewed before merge
4. **Testing** - All tests must pass
5. **Documentation** - Update docs with code changes
6. **Communication** - Keep team informed of progress

## References

- Domain-Driven Design: Eric Evans
- Event Sourcing: Greg Young
- State Machines: David Harel
- Clean Architecture: Robert C. Martin

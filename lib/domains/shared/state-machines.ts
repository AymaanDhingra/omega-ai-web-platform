/**
 * State Machine Definitions
 * 
 * Defines valid state transitions for all domain entities.
 */

export const SignalStateMachine = {
  initial: "created",
  states: {
    created: {
      transitions: { validate: "validated", cancel: "cancelled" }
    },
    validated: {
      transitions: { queue: "queued", cancel: "cancelled" }
    },
    queued: {
      transitions: { execute: "executed", cancel: "cancelled" }
    },
    executed: {
      transitions: { open: "open", partial: "partial", cancel: "cancelled" }
    },
    open: {
      transitions: { close: "closed", archive: "archived" }
    },
    partial: {
      transitions: { complete: "open", close: "closed", archive: "archived" }
    },
    closed: {
      transitions: { archive: "archived" }
    },
    cancelled: {
      transitions: { archive: "archived" }
    },
    archived: {
      transitions: {}
    }
  }
};

export const TradeStateMachine = {
  initial: "pending",
  states: {
    pending: {
      transitions: { open: "open", cancel: "cancelled" }
    },
    open: {
      transitions: { manage: "managing", partial: "partial", close: "closed", error: "error" }
    },
    managing: {
      transitions: { partial: "partial", close: "closed", error: "error" }
    },
    partial: {
      transitions: { manage: "managing", close: "closed", error: "error" }
    },
    closed: {
      transitions: { journal: "journaled" }
    },
    cancelled: {
      transitions: { journal: "journaled" }
    },
    error: {
      transitions: { recover: "managing", cancel: "cancelled" }
    },
    journaled: {
      transitions: {}
    }
  }
};

export const OrderStateMachine = {
  initial: "pending",
  states: {
    pending: {
      transitions: { submit: "submitted", cancel: "cancelled" }
    },
    submitted: {
      transitions: { accept: "accepted", reject: "rejected", cancel: "cancelled" }
    },
    accepted: {
      transitions: { fill: "filled", partial: "partial", expire: "expired", cancel: "cancelled" }
    },
    filled: {
      transitions: {}
    },
    partial: {
      transitions: { fill: "filled", cancel: "cancelled" }
    },
    rejected: {
      transitions: {}
    },
    cancelled: {
      transitions: {}
    },
    expired: {
      transitions: {}
    }
  }
};

export const PositionStateMachine = {
  initial: "open",
  states: {
    open: {
      transitions: { partial: "partial", close: "closing", error: "error" }
    },
    partial: {
      transitions: { open: "open", close: "closing", error: "error" }
    },
    closing: {
      transitions: { closed: "closed", error: "error" }
    },
    closed: {
      transitions: {}
    },
    error: {
      transitions: { recover: "open", close: "closing" }
    }
  }
};

export const PortfolioStateMachine = {
  initial: "healthy",
  states: {
    healthy: {
      transitions: { warn: "warning", critical: "critical" }
    },
    warning: {
      transitions: { healthy: "healthy", critical: "critical" }
    },
    critical: {
      transitions: { recover: "recovery", warning: "warning" }
    },
    recovery: {
      transitions: { healthy: "healthy", warning: "warning" }
    }
  }
};

export const StrategyStateMachine = {
  initial: "draft",
  states: {
    draft: {
      transitions: { activate: "active", archive: "archived" }
    },
    active: {
      transitions: { pause: "paused", archive: "archived", error: "error" }
    },
    paused: {
      transitions: { activate: "active", archive: "archived" }
    },
    archived: {
      transitions: {}
    },
    error: {
      transitions: { pause: "paused", archive: "archived" }
    }
  }
};

export const PaperTradeStateMachine = {
  initial: "generated",
  states: {
    generated: {
      transitions: { execute: "executed", cancel: "closed" }
    },
    executed: {
      transitions: { manage: "managing", close: "closed" }
    },
    managing: {
      transitions: { close: "closed" }
    },
    closed: {
      transitions: { analyze: "analytics-updated" }
    },
    "analytics-updated": {
      transitions: {}
    }
  }
};

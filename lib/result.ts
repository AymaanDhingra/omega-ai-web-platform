export type AppStateKind = "idle" | "loading" | "success" | "error" | "offline" | "unavailable";

export interface AppStatus {
  state: AppStateKind;
  message: string;
  retryable: boolean;
}

export interface LoadingModel extends AppStatus {
  state: "loading";
}

export interface SuccessModel<T> extends AppStatus {
  state: "success";
  data: T;
}

export interface ErrorModel extends AppStatus {
  state: "error";
  code: string;
}

export interface OfflineModel extends AppStatus {
  state: "offline";
}

export interface UnavailableModel extends AppStatus {
  state: "unavailable";
}

export type AppResult<T> = LoadingModel | SuccessModel<T> | ErrorModel | OfflineModel | UnavailableModel;

export function loading(message = "Loading"): LoadingModel {
  return { state: "loading", message, retryable: false };
}

export function success<T>(data: T, message = "Success"): SuccessModel<T> {
  return { state: "success", message, retryable: false, data };
}

export function failure(code: string, message: string, retryable = true): ErrorModel {
  return { state: "error", code, message, retryable };
}

export function offline(message = "Offline"): OfflineModel {
  return { state: "offline", message, retryable: true };
}

export function unavailable(message = "Unavailable"): UnavailableModel {
  return { state: "unavailable", message, retryable: false };
}

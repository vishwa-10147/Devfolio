export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly retryAfter?: number
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export class GitHubRateLimitError extends GitHubApiError {
  constructor(retryAfter: number) {
    super('GitHub API rate limit exceeded', 403, 'RATE_LIMITED', retryAfter);
    this.name = 'GitHubRateLimitError';
  }
}

export class GitHubNotFoundError extends GitHubApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'GitHubNotFoundError';
  }
}

export class GitHubNetworkError extends Error {
  constructor(message: string, public readonly originalError: Error) {
    super(message);
    this.name = 'GitHubNetworkError';
  }
}

export function isGitHubApiError(error: unknown): error is GitHubApiError {
  return error instanceof GitHubApiError;
}

export function isRateLimitError(error: unknown): error is GitHubRateLimitError {
  return error instanceof GitHubRateLimitError;
}

export function isNotFoundError(error: unknown): error is GitHubNotFoundError {
  return error instanceof GitHubNotFoundError;
}
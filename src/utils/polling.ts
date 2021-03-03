export interface LongPollResponse {
    stop: boolean;
}

export class LongPollRequest<T extends LongPollResponse> {
    private refetchAttempts = 0;
    private pollingStopped = false;
    // private timeout: ReturnType<typeof setTimeout>;
    constructor(
        private request: () => Promise<T>,
        private onPoll?: (response: T) => void,
        private onStop?: () => void,
        private maxAttempts = 5,
    ) {}

    private async makePoll() {
        try {
            if (this.pollingStopped) return;
            const response = await this.request();
            if (this.onPoll) {
                this.onPoll(response);
            }
            if (!response.stop) {
                // Request timeout
                // this.timeout = setTimeout(() => this.makePoll(), 2000);
                this.makePoll();
            } else {
                this.onStop();
            }
        } catch (error) {
            if (this.refetchAttempts < this.maxAttempts) {
                this.refetchAttempts++;
                this.makePoll();
                // Request timeout
                // this.timeout = setTimeout(() => this.makePoll(), 2000);
            } else {
                throw {
                    code: 'REFETCH_FAILED',
                    error,
                };
            }
        }
    }

    public startPolling() {
        this.makePoll();
        // Request timeout
        // this.timeout = setTimeout(() => this.makePoll());
    }

    public stopPolling() {
        this.pollingStopped = true;
        // Request timeout
        // clearTimeout(this.timeout);
    }
}

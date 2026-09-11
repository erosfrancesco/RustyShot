export interface State<TContext> {
  readonly name: string;
  enter(context: TContext): void;
  exit(context: TContext): void;
  update(context: TContext, deltaTime: number): void;
}

export class StateMachine<TContext> {
  private currentState?: State<TContext>;

  constructor(private readonly context: TContext) {}

  setState(state: State<TContext>): void {
    this.currentState?.exit(this.context);
    this.currentState = state;
    this.currentState.enter(this.context);
  }

  update(deltaTime: number): void {
    this.currentState?.update(this.context, deltaTime);
  }

  getCurrentStateName(): string | undefined {
    return this.currentState?.name;
  }
}

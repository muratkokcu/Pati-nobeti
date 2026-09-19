import { ScopedWorkCoordinator } from './repository';

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

describe('scoped work coordination', () => {
  it('invalidates old-scope commits and waits for delayed work before a sign-out purge', async () => {
    const coordinator = new ScopedWorkCoordinator();
    const oldLease = coordinator.activate('production:user-a:house-a');
    const remoteWrite = deferred<void>();
    const tracked = coordinator.track(oldLease, remoteWrite.promise);

    coordinator.activate(null);
    expect(coordinator.isCurrent(oldLease)).toBe(false);

    let purgeStarted = false;
    const barrier = coordinator.settleScopePrefix('production:user-a:').then(() => { purgeStarted = true; });
    await Promise.resolve();
    expect(purgeStarted).toBe(false);

    remoteWrite.resolve();
    await tracked;
    await barrier;
    expect(purgeStarted).toBe(true);
  });

  it('does not reuse an old household generation after the active scope changes', () => {
    const coordinator = new ScopedWorkCoordinator();
    const first = coordinator.activate('production:user-a:house-a');
    const second = coordinator.activate('production:user-a:house-b');
    expect(coordinator.isCurrent(first)).toBe(false);
    expect(coordinator.isCurrent(second)).toBe(true);
    expect(second.generation).toBeGreaterThan(first.generation);
  });
});

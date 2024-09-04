export default async function delayedPromise<T>(ms: number): Promise<T> {
  return new Promise((resolve) => {
    // Use setTimeout correctly to introduce a delay
    setTimeout(resolve, ms);
  });
}

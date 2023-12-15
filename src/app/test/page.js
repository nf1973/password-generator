export default async function Test() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <div>This is a test, sorry for the delay</div>;
}

export default function TodoItem({ onChange, text }) {
  return <input value={text} onChange={onChange} />;
}
